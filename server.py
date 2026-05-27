from flask import Flask, request, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import os 
import sqlite3

app  = Flask(__name__, template_folder='templates')

UPLOAD_FOLDER = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder physically exists on your computer
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class File_store(db.Model):

    __tablename__ = 'uploads'

    id = db.Column(db.Integer, primary_key = True)
    filename = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row  # Allows accessing columns by name like row['filename']
    return conn


with app.app_context():
    db.create_all()



@app.route('/test')
def test():
    return "Got It"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/print', methods = ['POST', 'GET'])
def printer():
    connection = get_db_connection()
    if request.method == 'POST':
        print(request)
        file = request.files.get('file')
        filename = secure_filename(file.filename)
        destination_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        file.save(destination_path)

        new_file_record = File_store(filename = filename, file_path = destination_path)
        db.session.add(new_file_record)
        db.session.commit()
            
        return jsonify({
                "message": "File successfully uploaded and tracked!",
                "database_id": new_file_record.id,
                "saved_filename": filename
            }), 201
    if request.method == 'GET':
        # FIX: Query the unified SQLAlchemy model instead of using raw sqlite3
        files_in_db = File_store.query.all()
        filenames = [file.filename for file in files_in_db]
        
        print(filenames)  # Prints list to your terminal console
        
        # Pro tip: rendering filenames as a JSON list makes it usable for your frontend
        return jsonify({"files": filenames}), 200

if __name__ == "__main__":
    app.run(debug=True)



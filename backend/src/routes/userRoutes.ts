import { Router, type Request, type Response } from "express"
import User from "../models/Users.js"
// import User from "../models/Users.js"

const router = Router()

router.get("/", async(req: Request, res: Response) =>{
    res.json({ message: "Users route working" })
})

router.post("/", async (req: Request, res: Response) =>{
    try{
        const user = await User.create(req.body)
        res.status(201).json(user)
        res.json(user)
    }catch(error: any){
        res.status(400).json({message: error.message})
    }
})

router.get("/", async( req: Request, res: Response )=>{
    try{
        const users = await User.find()
        res.json(users)
    } catch(error: any){
        res.status(500).json({ message:error.message })
    }
})

router.get("/:id", async (req: Request, res: Response)=>{
    try{
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ message: "User not Found"})
        res.json(user)
    }
    catch (error: any){
        res.status(500).json({ message: error.message })
    }
})

router.put("/:id", async (req:Request, res:Response)=>{
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id, req.body, {
                new: true
            }
        )
        if (!user) return res.status(404).json({ message: "User not Found"})
        
        res.json(user)
    }
    catch(error: any){
        res.status(400).json({ message: error.message })
    }
    })
router.delete("/:id", async (req: Request, res:Response)=>{
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) return res.status(400).json({ message: "User not Found"})
            res.json(user)
        }
        catch(error: any){
            res.status(500).json({ message: error.message })
        }
    })

export default router


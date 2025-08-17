import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { ContentModel, LinkModel, UserModel, UserValidationSchema} from "./db";
import { config } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import { connectDB } from "./db";

const app = express();
app.use(express.json());


app.post("/api/v1/signup", async (req, res) => {
    
    const parseResult = UserValidationSchema.safeParse(req.body);

    if(!parseResult.success){

        return res.status(400).json({
            errors: parseResult.error.issues
        });
    }
    const{username, password} = parseResult.data;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            username: username,
            password: hashedPassword
        })
        res.json({
            message: "You're Signedup"
        })
    }
    catch(e){
        res.status(409).json({
            message: "You're already signedup "
        })
    }
})

app.post("/api/v1/signin",async (req, res) => {
    
    const {username, password} = req.body;
    try{
        const user = await UserModel.findOne({username});
        if(!user){
            return res.status(403).json({
                message: "Invalid Credentials"
            });
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            return res.status(403).json({
                message: "Invalid Credentials"
            });
        }
        const token = jwt.sign({
            id: user._id
        }, config.JWT_SECRET);

        res.json({
            token
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
})

app.post("/api/v1/content", userMiddleware, async(req, res) => {
    const title = req.body.title;
    const link = req.body.link;

    await ContentModel.create({
        title,
        link,
        userId: req.userId,
        tags:[]
    })
    return res.json({
        message: "Content added"
    })
})

app.get("/api/v1/content/title", userMiddleware,async (req, res) => {
    const userId = req.userId;
    const searchValue = req.query.searchValue;
    const content = await ContentModel.findOne({
        userId: userId,
        title:{
            $regex: searchValue, $options: "i"
        },
    }).populate("userId", "username")
    if(!content){
        return res.json({
            message: "Content not found"
        })
    }
    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    if(!contentId){
        return res.status(400).json({
            message: "ContentId is required!!"
        })
    }
    const Deleted =  await ContentModel.deleteOne({
        _id: contentId,
        userId: req.userId
    });
    if(Deleted.deletedCount != 0){
            return res.json({
            message: "Content Deleted"
        })
    }
    res.status(403).json({
        message: "Content not found or not owned by user"
    });
    
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    
    if(share){
        const existingLink = await LinkModel.findOne({
            link: req.userId
        });
        if(existingLink){
            res.json({
                hash: existingLink.hash
            });
        }
        const hash = random(10);
        await LinkModel.create({
            hash: hash,
            link: req.userId
        });

        res.json({
            hash
        });
    } else{
        await LinkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "Removed Link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const linkDoc = await LinkModel.findOne({
        hash
    })

    if(!linkDoc){
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    const content = await ContentModel.find({
        userId: linkDoc.link
    })
    const user = await UserModel.findOne({
        
        _id: linkDoc.link
    })
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

const startServer = async () => {
  await connectDB();
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

startServer();
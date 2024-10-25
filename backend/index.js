const express = require("express");
const app = express();

const cors = require("cors");
const {initializeApp} = require("firebase/app");

const {getDoc,doc,getFirestore, setDoc, collection, query, where, getDocs} = require("firebase/firestore");

const {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged,signOut} = require("firebase/auth");

const BodyParser = require("body-parser");


app.use(BodyParser.json());

app.use(cors());

// Your Firebase configuration

function connectFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyAXrsENcXoFPz9wtQPqAwMf4VOdI3ZLbBo",
        authDomain: "neighbourhood-community-forum.firebaseapp.com",
        projectId: "neighbourhood-community-forum",
        storageBucket: "neighbourhood-community-forum.appspot.com",
        messagingSenderId: "265651622412",
        appId: "1:265651622412:web:724c21c9c7d73218a11429",
        measurementId: "G-PJL4CL5H2M"
    };

    const fb = initializeApp(firebaseConfig);
    const auth = getAuth(fb);
    const db = getFirestore(fb);
    return {auth,db};
}

const {auth,db} = connectFirebase();

app.get("/test",(req,res)=>{
    res.send("hello");
})



app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);
    
    try{
        const user = await signInWithEmailAndPassword(auth,email,password);
        console.log("login successful!");
        console.log(user.user.uid);
        const userCollection = collection(db,"users");
        const q = query(userCollection,where("uid","==",user.user.uid))
        getDocs(q).then((snap)=>{
            const {type} = snap.docs[0].data()  
            const id = snap.docs[0].id
            const location = snap.docs[0].data().location
            const name = snap.docs[0].data().name

            res.send({id,type,location,name});
        })
        // res.status(200).json({userId : user.user.uid});       
    }
    catch(error)
    {
        console.log(error);
        
        res.status(400).json({message:"Error occured..!",error});
    }
})


app.post("/signup",async(req,res)=>{
    const {name,email,password,address,location,type} = req.body;
    console.log(req.body);
    
    try{
        const userCredential = await createUserWithEmailAndPassword(auth,email,password);
        const user = userCredential.user;

        await setDoc(doc(db,'users',user.uid),{
            name,email,address,location,type,uid:user.uid
        })
        console.log("Sign up successful!");
        res.status(200).json({message:"ok"});       
    }
    catch(error)
    {
        res.status(400).json({message:"Error occured..!",error});
    }
})

app.post("/getmessage",async(req,res)=>{

    const {location} = req.body;
    console.log(req.body);
    
    console.log(location);
    
    try {
        const chatsCollection = collection(db, "chats");

        const locationQuery = query(chatsCollection, where("location", "==", location)); 
        const querySnapshot = await getDocs(locationQuery);
        let message =[];
        querySnapshot.forEach((doc) => {
            message.push(doc.data()); 
        });
        
        res.send(message);
    }
    catch (error) {
        console.log('Error getting documents: ', error);
    }
})

app.post("/sendmessage",async(req,res)=>{
    
    
    console.log(req.body);

    try{
        const chatsCollection = collection(db,"chats");

        await setDoc(doc(chatsCollection),req.body);
    }
    catch(error)
    {
        console.log(error);
    }
    
})

app.post('/sendpost', async (req, res) => {
    console.log(req.body);
    
    try {
      const { userId, userName, content, title, location, timestamp } = req.body;
      
      // Check for required fields
      if (!userId || !userName || !content || !timestamp) {
        return res.status(400).json({ error: 'Missing required fields: userId, userName, content, timestamp' });
      }
  
      // Prepare post data
      const newPost = {
        userId,
        userName,
        content,
        title: title || 'Untitled Post',
        location: location || 'Unknown',
        timestamp,
      };
  
      // Reference the Firestore 'posts' collection and add the new document
      const postsCollection = collection(db, 'posts');
      const postDoc = doc(postsCollection);  // Create a new document with an auto-generated ID
      await setDoc(postDoc, newPost);
  
      // Respond with success and the generated document ID
      res.status(201).json({ message: 'Post added successfully', postId: postDoc.id });
    } catch (error) {
      console.error('Error adding post to Firebase:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  app.get('/getpost', async (req, res) => {
    
    try {
      // Reference the Firestore 'posts' collection
      const postsCollection = collection(db, 'posts');
  
      // Get all documents in the collection
      const snapshot = await getDocs(postsCollection);
      
      // Map the documents to a more usable format
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      // Respond with the posts
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts from Firebase:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
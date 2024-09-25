import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb (null , './uploads');
    },
     filename : function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }}
)
const fileFilter = (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept file
    } else {
        const error = new Error('Only images are allowed');
        error.status = 400; // Set error status code
        cb(error);
    }
};

export const upload = multer({
    storage:storage,
    fileFilter: fileFilter,
    limits:{
        fileSize:1024*20
    }

});
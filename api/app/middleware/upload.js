import multer, { diskStorage } from "multer";
import { extname } from "path";

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const acceptableExtensions = [".png", ".jpg", ".mp4", ".mov", ".jpeg", "webp"];
  if (!acceptableExtensions.includes(extname(file.originalname))) {
    return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }

  const fileSize = parseInt(req.headers["content-length"]);
  if (fileSize > 1048576) {
    return callback(new Error("File Size Big"));
  }

  callback(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  fileSize: 1048576, 
});

export default upload;

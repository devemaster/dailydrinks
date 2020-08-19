const multer = require("multer");
const { URL } = require("../../lib/config");

//====================  image upload  ======================
//Storage the folder functionality
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype == "image/jpeg" || "image/png") {
      cb(null, "uploads/");
    } else {
      return cb({ success: false, message: "Only png, jpeg file can upload" });
    }
  },
  filename: function (req, file, cd) {
    var f1 = file.originalname;
    var text = f1.split(".")[1];
    var finle_name = Math.random() + "." + text;
    cd(null, finle_name);
  },
});

//upload the file function
var upload = multer({
  storage: storage,
}).any("");

module.exports.file_upload = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      res.json(err);
    } else {
      var imagename = req.files;
      const path = imagename[0].filename;
      const map1 = imagename.map((data) => {
        var imageurl = `${URL}${path}`;

        res.json({
          success: true,
          message: "Image uploaded successfully",
          imageurl: imageurl,
          path: path,
        });
      });
    }
  });
};
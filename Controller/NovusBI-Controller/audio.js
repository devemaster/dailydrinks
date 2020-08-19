const multer = require("multer");
const client = require("../../db");
var cors = require("cors");
const { URL } = require("../../lib/config");

//--------------- Storage the folder functionality ----------------
var storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "uploads/audio");
  },
  filename: function (req, file, cd) {
    cd(null, file.originalname);
  },
});

// --------------------upload the file function--------------------
var upload = multer({
  storage: storage,
}).any("");

//========================= Upload Audio =========================
module.exports.uploadAudio = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.warn(err);
    } else {
      var imagename = req.files;
      console.log(imagename);
      const path = imagename[0].filename;
      const map1 = imagename.map((data) => {
        var imageurl = `${URL}${path}`;

        res.json({
          success: true,
          message: "Audio uploaded successfully",
          imageurl: imageurl,
          path: path,
        });
      });
    }
  });
};

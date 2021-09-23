const model = require("./itemModel");
const path = require("path");
const appDir = path.dirname(require.main.filename);

exports.getItems = function (req, res) {
  model
    .find()
    .exec()
    .then((items) => {
      res.send(items);
    })
    .catch((error) => res.send(error.message));
};

exports.getItem = function (req, res) {
  model
    .findOne({ _id: req.params.itemId })
    .exec()
    .then((item) => res.status(200).send(item))
    .catch((error) => res.status(500).send(error.message));
};

function fillItemObj(req) {
  return {
    name: req.body.itemName,
    type: req.body.itemType,
    color: req.body.itemColor,
    shape: req.body.itemShape,
    description: req.body.itemDescription,
    imageUploadPath: saveImage(req.files),
  };
}

exports.addItem = function (req, res) {
  new model(fillItemObj(req))
    .save()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((error) => res.status(500).send(error.message));
};

exports.updItem = function (req, res) {
  model
    .findOneAndUpdate({ _id: req.body.itemId }, { $set: fillItemObj(req) })
    .exec()
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((error) => res.status(500).send(error.message));
};

exports.delItem = function (req, res) {
  model
    .findOneAndDelete({ _id: req.params.itemId })
    .exec()
    .then((item) => res.status(200).send(item))
    .catch((error) => res.status(500).send(error.message));
};

function saveImage(reqfiles) {
  let uploadPath = "";
  let imageFile = "";
  if (reqfiles) {
    imageFile = reqfiles.itemLocalImageFile;
    realUploadPath = path.join(appDir, "/images/items", imageFile.name);
    uploadPath = path.posix.join(
      path.posix.sep,
      "/images/items",
      imageFile.name
    );
    imageFile.mv(realUploadPath, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }
  return uploadPath;
}
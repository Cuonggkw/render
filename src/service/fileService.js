const path = require("path");

const uploadSingleFiles = async (fileObject) => {
  // save => public/images/upload
  let uploadPath = path.resolve(__dirname, "../public/images/upload");

  // abc.png => abc-timestamp.png
  let extName = path.extname(fileObject.name);

  let baseName = path.basename(fileObject.name, extName);

  // create final path: eg: /upload/you-image.png
  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;

  // upload multiple files
  try {
    await fileObject.mv(finalPath);
    return {
      status: "success",
      path: finalName,
      error: null,
    };
  } catch (err) {
    console.log(">> Check error: ", err);
    return {
      status: "failed",
      path: null,
      error: JSON.stringify(err),
    };
  }
};

const uploadMultipleFiles = async (fileArr) => {
  try {
    let uploadPath = path.resolve(__dirname, "../public/images/upload");
    let resultArr = [];
    let conutSuccess = 0;

    for (let i = 0; i < fileArr.length; i++) {
      // abc.png => abc-timestamp.png
      let extName = path.extname(fileArr[i].name);
      // console.log(">> Check extName: ", fileArr[i].name);

      let baseName = path.basename(fileArr[i].name, extName);

      // create final path: eg: /upload/you-image.png
      let finalName = `${baseName}-${Date.now()}${extName}`;
      let finalPath = `${uploadPath}/${finalName}`;

      try {
        await fileArr[i].mv(finalPath);
        resultArr.push({
          status: "success",
          path: finalName,
          fileName: fileArr[i].name,
          error: null,
        });
        conutSuccess++;
      } catch (err) {
        console.log(">> Check error: ", err);
        resultArr.push({
          status: "failed",
          path: null,
          fileName: fileArr[i].name,
          error: JSON.stringify(err),
        });
      }
    }

    return {
      conutSuccess: conutSuccess,
      detail: resultArr,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadSingleFiles, uploadMultipleFiles };

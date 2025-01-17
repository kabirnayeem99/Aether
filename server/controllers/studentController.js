const Student = require("../models/students");

const upsert = (req, res) => {
  let user = res.locals.user;

  // console.log(user);

  Student.upsert({
    nsuID: req.body.nsuID,
    name: req.body.name,
    sex: req.body.sex,
    uid: user.uid,
  })
    .then((student) => {
      res.status(201);
      res.send({
        message: "Student Profile updated!",
        student: student[0]
      });
    })
    .catch((err) => {
      res.status(403);
      res.send({
        message: "Profile update failed!",
      });
    });
};

const isCompleted = (req, res) => {
  let user = res.locals.user;

  Student.findOne({
    where: {
      uid: user.uid,
    },
  })
    .then((student) => {
      if (student != null) {
        res.status(202);
        res.send({
          isCompleted: true,
          message: "Profile verification is completed!",
        });
      } else {
        res.status(204);
        res.send({
          isCompleted: false,
          message: "Profile verification is completed!",
        });
      }
    })
    .catch((err) => {
      res.status(204);
      res.send({
        isCompleted: false,
        message: err.message,
      });
    });
};

const details = (req, res) => {
  let user = res.locals.user;

  Student.findOne({
    where: {
      uid: user.uid,
    },
  })
    .then((student) => {
      res.status(200);
      res.send({
        message: "request successful!",
        student: student,
      });
    })
    .catch((err) => {
      res.status(403);
      res.send({
        message: "unsuccessful request!",
      });
    });
};

module.exports = {
  upsert,
  isCompleted,
  details,
};

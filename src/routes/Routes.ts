import express from "express";
import Project from "../models/projectModle";

const router = express.Router();

router.post("/createProject", (req, res) => {
  const {
    name,
    description,
    startDate,
    endDate,
    manager,
    members,
    task,
    color,
    type,
  } = req.body;

  if (
    name == null || description == null || startDate == null || endDate == null || manager == null || color == null
  ) {
    return res.json({
      sucess: false,
      message: "Please Fill all the fields",
      data: null,
      errors: null,
    });
  } else {
    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      manager,
      members,
      task,
      color,
      type,
    });

    newProject
      .save()
      .then((project) => {
        res.json({
          sucess: true,
          message: "Project created",
          data: [
            {
              id: project._id,
              name: project.name,
              description: project.description,
              startDate: project.startDate,
              endDate: project.endDate,
              manager: project.manager,
              team: project.members,
              task: project.task,
              color: project.color,
              type: project.type,
            },
          ],
          errors: null,
        });
      })
      .catch((err) => {
        res.json({
          sucess: false,
          message: "Project not created",
          data: null,
          errors: err,
        });
      });
  }
});

router.get("/getProjects", (req, res) => {
    Project.find()
        .then((projects) => {
        res.json({
            sucess: true,
            message: "Projects found",
            data: projects,
            errors: null,
        });
        })
        .catch((err) => {
        res.json({
            sucess: false,
            message: "Projects not found",
            data: null,
            errors: err,
            });
        });
    });


router.get("/getProjectbyid/:id", (req, res) => {

    Project.findById(req.params.id)
        .then((project) => {
        res.json({
            sucess: true,
            message: "Project found",
            data: project,
            errors: null,
        });
        })
        .catch((err) => {
        res.json({
            sucess: false,
            message: "Project not found",
            data: null,
            errors: err,
            });
        });
    });


    router.delete("/deleteProject/:id",(req,res)=>{

      
      Project.findByIdAndDelete(req.params.id)
      .then((project)=>{
        res.json({
          success: true,
          msg: 'Project deleted!',
          data: project,
          errors: null
        })

      })
     .catch((err)=>{
        res.status(400).json(
            {
                success: false,
                msg: 'somthing wrong ! please check error',
                data : [],
                errors :{
                err : err
                }
            }
        );
    })  

    })



  router.post("/addTask", (req, res) => {

    const { id, task } = req.body;

    Project.findByIdAndUpdate(id, { $push: { task: task} } , {new: true})
      .then((project) => {
        res.json({
          sucess: true,
          message: "Task added",
          data: project,
          errors: null,
        });
      })
      .catch((err) => {
        res.json({
          sucess: false,
          message: "Task not added",
          data: null,
          errors: err,
        });
      });

  });

  router.get("/deleteTask/:id/:taskid",(req,res)=>{
    const {id,taskid} = req.params;

    Project.findByIdAndUpdate(id, { $pull: { task: {_id: taskid} } } , {new: true})
      .then((project) => {
        res.json({
          sucess: true,
          message: "Task deleted",
          data: project,
          errors: null,
        });
      })
      .catch((err) => {
        res.json({
          sucess: false,
          message: "Task not deleted",
          data: null,
          errors: err,
        });
      });

  })


  router.post("/updateTask/:id/:taskid",(req,res)=>{

    const {id,taskid} = req.params;
    const {task} = req.body;

     Project.findOneAndUpdate({_id: id, "task._id": taskid}, {$set: {"task.$": task}}, {new: true})
      .then((project) => {
        res.json({
          sucess: true,
          message: "Task updated",
          data: project,
          errors: null,
        });
      })
      .catch((err) => {
        res.json({
          sucess: false,
          message: "Task not updated",
          data: null,
          errors: err,
        });
      });

  });


export default router;

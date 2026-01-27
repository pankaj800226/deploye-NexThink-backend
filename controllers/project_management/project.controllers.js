import { Project } from '../../model/project_management/project.model.js'

export const createProject = async (req, res) => {
    try {
        const userId = req.userId
        const { title, description, category, priority, startDate, endDate } = req.body

        if (!title || !description || !category || !priority || !startDate || !endDate) {
            return res.status(400).json({ message: "All field are required" })
        }

        const createProject = await Project.create({
            userId,
            title,
            description,
            category,
            priority,
            startDate,
            endDate,
            status: 'working'
        })


        res.status(200).json(createProject)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" })

    }
}

export const getProject = async (req, res) => {
    try {
        const userId = req.userId

        const findProject = await Project.find({ userId })

        if (!findProject) {
            return res.status(404).json({ message: "project not found" })
        }

        res.status(200).json({ message: "project find sucessfull", findProject })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" })

    }
}
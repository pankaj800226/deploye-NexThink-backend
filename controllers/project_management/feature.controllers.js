import { Feature } from '../../model/project_management/feature.model.js'

export const createFeature = async (req, res) => {
    try {
        const { projectId } = req.params
        const userId = req.userId
        const { title, status } = req.body

        const createFeature = new Feature({
            projectId,
            userId,
            title,
            status
        })

        await createFeature.save()

        res.status(200).json({ message: "feature upload done", createFeature })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server is running" })
    }
}

export const getFeature = async (req, res) => {
    try {
        const { projectId } = req.params


        const findFeature = await Feature.find({ projectId }).sort({ createdAt: -1 })

        if (!findFeature) {
            return res.status(404).json({ message: "Feature not found" })
        }

        res.status(200).json({ message: "feature done", findFeature })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server is running" })

    }
}

export const getFeatureById = async (req, res) => {
    try {
        const { id } = req.params


        const findFeature = await Feature.findById(id)

        if (!findFeature) {
            return res.status(404).json({ message: "Feature not found" })
        }

        res.status(200).json(findFeature)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server is running" })

    }
}

export const featureDelete = async (req, res) => {
    try {
        const { id } = req.params

        const deleteFeature = await Feature.findByIdAndDelete(id)

        if (!deleteFeature) {
            return res.status(404).json({ message: "Feature not found" })
        }

        res.status(200).json(deleteFeature)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server is running" })

    }
}

export const editFeature = async (req, res) => {
    try {
        const { id } = req.params
        const { title, status } = req.body

        const edit = await Feature.findByIdAndUpdate(id, {
            title,
            status
        }, { new: true })

        if (!edit) {
            return res.status(404).json({ message: "feature edit not found" })
        }

        res.status(200).json(edit)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server is running" })

    }
}
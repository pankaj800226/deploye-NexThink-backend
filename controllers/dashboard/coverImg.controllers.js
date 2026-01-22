import cloudinary from "../../utils/cloudnary.js";
import { CoverPhoto } from '../../model/dashboard/coverImg.model.js'

export const createCoverImg = async (req, res) => {
    try {
        const userId = req.userId

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" })
        }

        const uploadCover = cloudinary.uploader.upload_stream(
            {
                folder: "cover_photo"
            },

            async (error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Cloudnary uplod failed" });
                }

                const cover = await CoverPhoto.findOneAndUpdate(
                    { userId },
                    { coverPhoto: result.secure_url },
                    { new: true, upsert: true }
                );

                // res.status(200).json(cover)
                res.status(200).json({
                    coverPhoto: cover.coverPhoto,
                });
            }
        )

        uploadCover.end(req.file.buffer)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" })

    }
}

export const findCover = async (req, res) => {
    try {
        const userId = req.userId

        const cover = await CoverPhoto.findOne(
            { userId },
        );

        res.status(200).json(cover)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" })

    }
}

export const deleteCover = async (req, res) => {
    try {
        // const { id } = req.params
        const userId = req.userId


        await Cover.findOneAndDelete({ userId: req.user.id });


        if (!coverRemove) {
            return res.status(400).json({ message: "cover image not deleted" })
        }


        res.status(200).json(coverRemove)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" })

    }
}
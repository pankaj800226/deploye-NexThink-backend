import { Scheduler } from "../../model/work_shedular/shedular.model.js";

/* ---------------- CREATE ---------------- */
export const createShedular = async (req, res) => {
    try {
        const { title, weeks } = req.body;
        const userId = req.userId;

        const newScheduler = await Scheduler.create({
            title,
            weeks,
            userId
        });

        return res.status(201).json({
            success: true,
            message: "Scheduler created successfully",
            task: newScheduler
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
};

/* ---------------- GET ALL ---------------- */
export const getAllSchedulers = async (req, res) => {
    try {
        const userId = req.userId;

        const schedulers = await Scheduler.find({ userId })

        return res.status(200).json({
            success: true,
            schedulers
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch schedulers"
        });
    }
};

/* ---------------- TOGGLE DAY + AUTO WEEK ---------------- */
export const toggleDayChecked = async (req, res) => {
    try {
        const { taskId, weekNo, dayIndex, checked } = req.body;
        const userId = req.userId;

        const shedular = await Scheduler.findOne({
            _id: taskId,
            userId
        });

        if (!shedular) {
            return res.status(404).json({
                success: false,
                message: "Scheduler not found"
            });
        }

        const week = shedular.weeks.find(w => w.weekNo === weekNo);
        if (!week) {
            return res.status(404).json({
                success: false,
                message: "Week not found"
            });
        }

        /* ✅ update checkbox */
        week.days[dayIndex].checked = checked;

        /* ✅ CHECK IF WEEK COMPLETED */
        const isWeekCompleted = week.days.every(d => d.checked);

        if (isWeekCompleted) {
            const lastWeek = shedular.weeks[shedular.weeks.length - 1]

            if (lastWeek.weekNo === week.weekNo) {
                const lastDate = new Date(lastWeek.days[6].date)

                const newWeek = {
                    weekNo: lastWeek.weekNo + 1,
                    days: Array.from({ length: 7 }).map((_, i) => {
                        const d = new Date(lastDate)
                        d.setDate(d.getDate() + i + 1)
                        return {
                            checked: false,
                            date: d.toISOString()
                        };
                    })
                }

                shedular.weeks.push(newWeek)
            }
        }

        await shedular.save();

        return res.status(200).json({
            success: true,
            message: "Day updated",
            task: shedular
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update day"
        });
    }
};

export const shedularDelete = async (req, res) => {
    try {
        const { id } = req.params

        const deleteShedular = await Scheduler.findByIdAndDelete(id)

        if (!deleteShedular) {
            return res.status(404).json({ message: "Delete not found" })
        }

        res.status(200).json(deleteShedular)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update day"
        });
    }
}

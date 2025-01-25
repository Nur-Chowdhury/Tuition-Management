import Ad from "../models/Ad.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createAd = async(req, res, next) => {

    const {content, topics} = req.body;
    if(!req.body.content){
        return next(errorHandler(400, "Please Provide some content!"));
    }
    const slug = topics.join('-').toLowerCase().replace(/[^a-zA-z0-9-]/g, '');
    const newAd = new Ad({
        content,
        topics,
        slug,
        userId: req.user.userId,
    });
    try{
        const savedAd = await newAd.save();

        const tutors = await User.find({
            userType: 'tutor',
            interestedTopics: { $in: topics },
        });

        const notifications = tutors.map((tutor) => ({
            userId: tutor._id,
            adId: savedAd._id,
            message: `A new ad matches your topics: ${topics.join(', ')}`,
        }));

        await Notification.insertMany(notifications);


        res.status(201).json(savedAd);
    } catch(error){
        next(error);
    }
}

export const adInterested = async (req, res) => {
  
    try {
        const ad = await Ad.findById(req.params.adId);
        if (!ad) {
            return res.status(404).send('Post not found');
        }
        await ad.toggleInterest(req.user.userId);
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getAds = async (req, res, next) => {
    try {
      const ads = await Ad.find().sort({
        createdAt: -1,
      });
      res.status(200).json(ads);
    } catch (error) {
      next(error);
    }
};

export const adInterest = async (req, res) => {
  
    try {
        const ad = await Ad.findById(req.params.adId);
        if (!ad) {
            return res.status(404).send('Ad not found');
        }
        await ad.toggleInterest(req.user.userId);
        res.status(200).send(ad);
    } catch (error) {
        res.status(500).send(error.message);
    }
  }
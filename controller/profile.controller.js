import Profile from "../models/Profile.js";

// @route       GET api/profile/me
// @desc        Get current users profile
export const getProfileMe = async (req, res) => {
  // auth vardı
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}; // incelenecek

// @route       POST api/profile
// @desc        Create or update user profile
export const createProfile = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  /*
{
    "company": "apple",
    "website": "www.test2.com",
    "location": "testlocation",
    "bio": "testbio",
    "status": "teststatus",
    "githubusername": "testgithub",
    "skills": "testskills testskills2", ===>>> FOR POSTMAN
    "youtube": "testyoutube",
    "facebook": "testface",
    "twitter": "testx",
    "instagram": "testinsta",
    "linkedin": "testlinkedin"
}
*/
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;
  console.log(req.body);
  // Build profile object
  const profileFields = {};
  profileFields.user = req.user;
  console.log(req.user);
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  // Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;

  try {
    let profile = await Profile.findOne({ user: req.user.id }); // ({ _id: { $in: ids } });
    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    console.log(profileFields);
    // Create
    profileFields.user = req.user.id;
    profile = new Profile(profileFields);

    await profile.save();
    console.log(profile);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "");
   
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
};

export const deleteProfile = async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const updateProfile = async (req, res) => {
  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  console.log(title, company, location, from, to, current, description);

  res.json(req.body);
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(newExp);
  
    console.log(profile.experience.unshift(newExp));

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
  }
};

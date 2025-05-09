const User = require("../Models/user");
const userController = {};

userController.saveUser=async(userName, sid)=>{
    // 재접속한 유저인지 확인
    let user = await User.findOne({name: userName});

    // 새로운 유저라면, 유저정보 만들기
    if(!user) {
        user = new User({
            name : userName,
            token: sid,
            online: true,
        });
    } else {    
        // 재접속한 유저라면, 연결정보 token값만 변경
        user.token = sid;
        user.online = true;    
    }
    
    await user.save();
    return user;
};

userController.checkUser = async (sid) => {
    const user = await User.findOne({ token: sid });
    if (!user) throw new Error("User not found. Please re-login.");
    return user;
};

module.exports = userController;
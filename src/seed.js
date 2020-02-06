const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
const server = http.createServer(app)

const User = require('./models/user')
const Match= require('./models/match')
const Like= require('./models/like')
const Message = require('./models/message')

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log('server is up on port'+port)
})

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    username: 'ginger',
    password: 'default123',
    email: "g@hotmail.com",
    breed: "german shepard",
    age: 3,
    bio: "ginger is a very affectionate dog and can never get enough of being out doors",
    image_url: "https://i.ytimg.com/vi/5SA11jSqotg/hqdefault.jpg"
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    username: 'labo',
    password: 'default123',
    email: "l@hotmail.com",
    breed: "labrador",
    age: 4,
    bio: "labo loves to play games and is full of energy",
    image_url: "https://st4.depositphotos.com/16122460/20400/i/1600/depositphotos_204007616-stock-photo-cute-yellow-labrador-retriever-owner.jpg"
}

const userThreeId = new mongoose.Types.ObjectId()
const userThree = {
    _id: userThreeId,
    username: 'dingo',
    password: 'default123',
    email: "d@hotmail.com",
    breed: "german shepard",
    age: 3,
    bio: "dingo is an old soul, he prefers to relax around the house but still loves company",
    image_url: "https://i.dailymail.co.uk/i/pix/2014/02/10/article-2555760-1B59190F00000578-76_634x522.jpg"
}

const userFourId = new mongoose.Types.ObjectId()
const userFour = {
    _id: userFourId,
    username: 'Wolf',
    password: 'default123',
    email: "w@hotmail.com",
    breed: "wolf",
    age: 3,
    bio: "wolf is not a dog, but he still needs friends",
    image_url: "https://www.thesun.co.uk/wp-content/uploads/2019/01/NINTCHDBPICT000460252723.jpg"
}

const userFiveId = new mongoose.Types.ObjectId()
const userFive = {
    _id: userFiveId,
    username: 'grey',
    password: 'default123',
    email: "gr@hotmail.com",
    breed: "grey hound",
    age: 6,
    bio: "grey is super fast, he's very calm when were at home. But when I take him to the park no one can keep up with him",
    image_url: "https://www.sundaypost.com/wp-content/uploads/sites/13/2017/12/jw0022083.JPG-e1514063889763.jpg"
}

const userSixId = new mongoose.Types.ObjectId()
const userSix = {
    _id: userSixId,
    username: 'cindy',
    password: 'default123',
    email: "c@hotmail.com",
    breed: "cocker spaniel",
    age: 6,
    bio: "cindy gets along really well with other dogs. she always wants to share her toys",
    image_url: "https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/6/2020/01/Nick-Ted-28_283188651_499552262.jpg"
}

const userSevenId = new mongoose.Types.ObjectId()
const userSeven = {
    _id: userSevenId,
    username: 'jerome',
    password: 'default123',
    email: "j@hotmail.com",
    breed: "german shepard",
    age: 7,
    bio: "jerome is part pet part therapist",
    image_url: "https://germanshepherdcountry.com/wp-content/uploads/2019/06/gsd_800x572.jpg"
}

const userEightId = new mongoose.Types.ObjectId()
const userEight = {
    _id: userEightId,
    username: 'andy',
    password: 'default123',
    email: "a@hotmail.com",
    breed: "aikita",
    age: 6,
    bio: "andys a super protective dog, she gets alog with dogs her size but sometimes gets aggresive with bigger ones.",
    image_url: "https://i.dailymail.co.uk/i/pix/2012/10/24/article-2222299-15A82799000005DC-779_308x185.jpg"
}

const userNineId = new mongoose.Types.ObjectId()
const userNine = {
    _id: userNineId,
    username: 'pauly',
    password: 'default123',
    email: "p@hotmail.com",
    breed: "pointer",
    age: 4,
    bio: "pauly is a contriversial dog, though he loves it when we go hunting",
    image_url: "https://image.freepik.com/free-photo/happy-owner-pointer-dog-hunter-with-shotgun_99043-325.jpg"
}

const userTenId = new mongoose.Types.ObjectId()
const userTen = {
    _id: userTenId,
    username: 'harry',
    password: 'default123',
    email: "hu@hotmail.com",
    breed: "husky",
    age: 4,
    bio: "harry loves the cold, and can play outside all day",
    image_url: "https://en.goodtimes.my/wp-content/uploads/2018/02/2302dog1.jpg"
}

const userElevenId = new mongoose.Types.ObjectId()
const userEleven = {
    _id: userElevenId,
    username: 'danger',
    password: 'default123',
    email: "da@hotmail.com",
    breed: "doberman",
    age: 4,
    bio: "danger is an adventerous dog, though he gets in trouble too much sometimes",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGkpoB4V0e7YADu50iK-QloIziaj5Hk1fneOnwvzcqECLLtgZd"
}

const likeOneId = new mongoose.Types.ObjectId()
const likeOne = {
    _id: likeOneId,
    sender: userFourId,
    reciever: userTwoId
}
const likeTwoId = new mongoose.Types.ObjectId()
const likeTwo = {
    _id: likeTwoId,
    sender: userSixId,
    reciever: userTwoId
}

const likeThreeId = new mongoose.Types.ObjectId()
const likeThree = {
    _id: likeThreeId,
    sender: userFiveId,
    reciever: userThreeId
}

seed = async () => {
    const u1 = await new User(userOne).save()
    const u2 = await new User(userTwo).save()
    const u3 = await new User(userThree).save()
    const u4 = await new User(userFour).save()
    const u5 = await new User(userFive).save()
    const u6 = await new User(userSix).save()
    const u7 = await new User(userSeven).save()
    const u8 = await new User(userEight).save()
    const u9 = await new User(userNine).save()
    const u10 = await new User(userTen).save()
    const u11 = await new User(userEleven).save()
    const like1 = await new Like(likeOne).save()
    const like2 = await new Like(likeTwo).save()
    const like3 = await new Like(likeThree).save()
    console.log("done seeding")
}

seed()

require('../src/db/mongoose')
const User = require('../src/modules/user')

// User.findByIdAndUpdate('5e9d44f348e02f3290110fb6', {age: 1}).then((users) => {
//     console.log(users)
//     return User.countDocuments({age: 1})
// }).then((user) => {
//     console.log(user)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5e9d44f348e02f3290110fb6', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
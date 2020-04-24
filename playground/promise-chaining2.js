require('../src/db/mongoose')
const Task = require('../src/modules/task')

// Task.findByIdAndDelete('5e9dbbf533747324f462c199').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5e9dbad0ae28133dd043b855').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
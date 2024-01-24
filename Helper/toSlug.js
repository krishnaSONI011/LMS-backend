const slugify = require('slugify')

function slug (category){
    
    return slugify(category)
}
module.exports= slug
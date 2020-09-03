router.post('/register', (req,res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({msg: 'Email already exists'})
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.getSalt(10, (error, salt) => {
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if (error) throw error
                    newUser.password = hash
                    newUser.save()
                    .then(createdUser => res.json(createdUser))
                    .catch(error => console.log(error))
                })
            })
        }
    })
})
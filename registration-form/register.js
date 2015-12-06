$(document).ready(function() {
            $("#validation-form").validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    email2: {
                        required: true,
                        equalTo: "#email"
                    },	
                    password: {
                        required: true,
                        minlength: 5
                    },
                    password2: {
                        required: true,
                        equalTo: "#password"
                    },
                    terms: "required"
                },
                messages: {
                    email: { 
                        required: "Please enter your email",
                        email: "Please enter a valid address"
                    },
                    email2: { 
                       required: "Please confirm yout email",
                       equalTo: "Your email do not match"
                    },
                    password: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    password2: {
                        required: "Please provide a password",
                        equalTo: "Password do not match"
                    },
                    terms: "Please accept our policy"
                }
            });
           
            $('.noncopypasteable').bind('cut copy paste', function(e) {
                e.preventDefault();
            });
});

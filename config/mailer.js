module.exports = function(nodemailer,mail_template) {
	return function(){
	var smtpTransport = nodemailer.createTransport("SMTP",{
		service: "Gmail",
		auth: {
			user: "mattmccarn@gmail.com",
			pass: "ycachyzzunqunusg"
		}
	});
	this.sendMail = function(username,hash){
		//var html = "<a href\=\"localhost:3000/validate/>" + encodeURI(hash.toString()) + "\">Validate</a>" 
		var html = '<a href="http://google.com">Validate</a>' 
    var mailOptions = {
      to: username,
      subject: "Validate your Todojitsu account",
      html:mail_template({username:username,hash:hash}), 
			text: "this is the text"
      };
			smtpTransport.sendMail(mailOptions,function(error,response){
      if(error){
        console.log(error);
      }
      else
      {
        console.log("Message sent: " + response.message);
      }

    });  
	};
  this.sendMailRoute = function(username,hash){
    return function(req,res){
		this.sendMail(username,hash);
    res.send(200);
    }
  }
	};
  
}

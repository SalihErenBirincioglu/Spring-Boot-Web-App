package com.saliheren.mywebapp.login;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.slf4j.Logger;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@SessionAttributes("name")
public class LoginController {

    private Logger logger= LoggerFactory.getLogger(getClass());

    @RequestMapping(value = "login",method = RequestMethod.GET)
    public String gotoLogin(){
       return "login";
    }

    @RequestMapping(value = "login",method = RequestMethod.POST)
    public String gotoWelcomePage(@RequestParam String name,@RequestParam String password,ModelMap model){
        model.put("name",name);
        model.put("password",password);
        return "welcome";
    }
}
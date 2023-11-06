package com.saliheren.mywebapp.todo;

import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.time.LocalDate;
import java.util.List;

@Controller
@SessionAttributes("name")
public class TodoController {

    public TodoController(TodoService todoService){
        super();
        this.todoService =todoService;
    }
    private TodoService todoService;

    @RequestMapping("list-todos")
    public String listAllTodos(ModelMap model) {
        List<Todo> todos = todoService.findByUsername("salih");
        model.addAttribute("todos", todos);
        return "listTodos";
    }

    @RequestMapping(value = "add-todos",method = RequestMethod.GET)
    public String showNewTodos(ModelMap modelMap) {
        String username = (String)modelMap.get("name");
        Todo todos = new Todo(0,username,"",LocalDate.now().plusYears(1),false);
        modelMap.put("todos",todos);
        return "Todos";
    }

    @RequestMapping(value = "add-todos",method = RequestMethod.POST)
    public String addNewTodos(ModelMap modelMap, @Valid Todo todos, BindingResult result) {
        if(result.hasErrors()){
            return "Todos";
        }
        String username = (String)modelMap.get("name");
        todoService.addTodo(username,todos.getDescription(), LocalDate.now().plusYears(1),false);
        return "redirect:list-todos";
    }

}

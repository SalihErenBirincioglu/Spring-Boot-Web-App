package com.saliheren.mywebapp.todo;

import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.time.LocalDate;
import java.util.List;

@Controller
@SessionAttributes("name")
public class TodoControllerJpa {

    public TodoControllerJpa(TodoRepository todoRepository){
        super();
        this.todoRepository=todoRepository;
    }

    private TodoRepository todoRepository;

    @RequestMapping("list-todos")
    public String listAllTodos(ModelMap model) {
        String username = getLoggedInUsername(model);
        List<Todo> todos = todoRepository.findByUsername(username);
        model.addAttribute("todos", todos);
        return "listTodos";
    }

    @RequestMapping(value = "add-todos",method = RequestMethod.GET)
    public String showNewTodos(ModelMap modelMap) {
        String username = getLoggedInUsername(modelMap);
        Todo todo = new Todo(0,username,"",LocalDate.now().plusYears(1),false);
        modelMap.addAttribute("todo",todo);
        return "Todos";
    }

    @RequestMapping(value = "add-todos",method = RequestMethod.POST)
    public String addNewTodos(ModelMap modelMap, @Valid Todo todos, BindingResult result) {
        if(result.hasErrors()){
            return "Todos";
        }
        String username = getLoggedInUsername(modelMap);
        todos.setUsername(username);
        todoRepository.save(todos);
        //todoService.addTodo(username,todos.getDescription(), todos.getTargetDate(), todos.isDone());
        return "redirect:list-todos";
    }

    @RequestMapping("delete-todo")
    public String deleteTodo(@RequestParam int id) {
        todoRepository.deleteById(id);
        return "redirect:list-todos";
    }

    @RequestMapping(value = "update-todo",method = RequestMethod.GET)
    public String showUpdateTodoPage(@RequestParam int id, ModelMap modelMap) {
        Todo todo = todoRepository.findById(id).get();
        modelMap.addAttribute("todo",todo);
        return "Todos";
    }

    @RequestMapping(value = "update-todo",method = RequestMethod.POST)
    public String updateTodo(ModelMap modelMap, @Valid Todo todo, BindingResult result) {
        if(result.hasErrors()){
            return "Todos";
        }
        String username = getLoggedInUsername(modelMap);
        todo.setUsername((username));
        todoRepository.save(todo);
        //todoService.updateTodo(todo);
        return "redirect:list-todos";
    }

    private String getLoggedInUsername(ModelMap modelMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }


}

package com.saliheren.mywebapp.todo;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {

    private static List<Todo> todoList = new ArrayList<>();
    public static int todoId=0;

    static {
        todoList.add(new Todo(++todoId,"eren","Learn AWS",
                LocalDate.now().plusYears(1), false ));
        todoList.add(new Todo(++todoId,"salih","Learn SpringBoot",
                LocalDate.now().plusYears(2), false ));
        todoList.add(new Todo(++todoId,"salih","Learn electron.js",
                LocalDate.now().plusYears(2), false ));
    }

    public List<Todo> findByUsername(String username){
        return todoList;
    }

    public void addTodo(String username, String description,LocalDate targetDate,Boolean done){
        Todo todo= new Todo(++todoId, username, description, targetDate, done);
        todoList.add(todo);
    }
}

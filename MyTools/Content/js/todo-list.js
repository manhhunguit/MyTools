$(document).ready(function () {
    function TodoListViewModel() {
        var self = this;

        self.todoDetailsViewModel = new TodoDetailsViewModel();
        self.confirmToDeleteTodoViewModel = new ConfirmToDeleteTodoViewModel();
        self.confirmToPermanentlyDeleteTodoViewModel = new ConfirmToPermanentlyDeleteTodoViewModel();

        self.isReady = ko.observable(false);
        self.showDeletedItems = ko.observable();
        self.originalTodoItems = ko.observableArray(null);
        self.todoItems = ko.observableArray(null);
        
        self.loadTodoList = function () {
            $("#loading").show();
            $.ajax({
                url: "/DesktopModules/MTGet/API/TodoItems",
                type: "GET",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    $("#loading").hide();

                    self.isReady(true);
                    self.originalTodoItems(data);
                    self.refreshTodoList();
                }
            });
        };

        self.refreshTodoList = function (item) {
            var items = self.showDeletedItems()
                ? self.originalTodoItems()
                : self.originalTodoItems().filter(function (x) { return !x.IsDeleted });
            self.todoItems([]);
            self.todoItems(items);
        };

        self.addTodo = function () {
            self.todoDetailsViewModel.callback = self.loadTodoList;

            self.todoDetailsViewModel.Id(null);
            self.todoDetailsViewModel.Title(null);
            self.todoDetailsViewModel.Description(null);
            self.todoDetailsViewModel.Done(false);

            self.todoDetailsViewModel.TitleHasError(false);

            $("#todo-details-modal").modal("show");
        };

        self.editTodo = function (item) {
            $("#loading").show();
            $.ajax({
                url: "/DesktopModules/MTGet/API/TodoItems/" + item.Id,
                type: "GET",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    $("#loading").hide();

                    self.todoDetailsViewModel.callback = self.loadTodoList;

                    self.todoDetailsViewModel.Id(data.Id);
                    self.todoDetailsViewModel.Title(data.Title);
                    self.todoDetailsViewModel.Description(data.Description);
                    self.todoDetailsViewModel.Done(data.Done);

                    self.todoDetailsViewModel.TitleHasError(false);

                    $("#todo-details-modal").modal("show");
                }
            });
        };

        self.confirmBeforeDeleteTodo = function (item) {
            self.confirmToDeleteTodoViewModel.callback = self.loadTodoList;

            self.confirmToDeleteTodoViewModel.Id(item.Id);

            $("#confirm-to-delete-todo-modal").modal("show");
        };

        self.confirmToPermanentlyDeleteTodo = function (item) {
            self.confirmToPermanentlyDeleteTodoViewModel.callback = self.loadTodoList;

            self.confirmToPermanentlyDeleteTodoViewModel.Id(item.Id);

            $("#confirm-to-permanently-delete-todo-modal").modal("show");
        };

        self.restoreTodo = function (item) {
            $("#loading").show();
            $.ajax({
                url: "/DesktopModules/MTPatch/API/TodoItems/" + item.Id,
                data: JSON.stringify({
                    IsDeleted: false
                }),
                type: "PATCH",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    $("#loading").hide();
                    $("#todo-details-modal").modal("hide");

                    self.loadTodoList();
                }
            });
        };

        self.loadTodoList();
    };

    function TodoDetailsViewModel() {
        var self = this;

        self.callback = null;

        self.Id = ko.observable(null);
        self.Title = ko.observable(null);
        self.Description = ko.observable(null);
        self.Done = ko.observable(true);

        self.TitleHasError = ko.observable(false);

        self.validateTodo = function () {
            var isValid = true;

            if (!self.Title()) {
                self.TitleHasError(true);
                isValid = false;
            }
            else {
                self.TitleHasError(false);
            }

            return isValid;
        };

        self.saveTodo = function () {
            if (self.validateTodo()) {
                $("#loading").show();
                if (!self.Id()) {
                    $.ajax({
                        url: "/DesktopModules/MTPost/API/TodoItems",
                        data: JSON.stringify({
                            Title: self.Title(),
                            Description: self.Description(),
                            Done: self.Done()
                        }),
                        type: "POST",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            $("#loading").hide();
                            $("#todo-details-modal").modal("hide");

                            if (self.callback) {
                                self.callback();
                            }
                        }
                    });
                } else {
                    $.ajax({
                        url: "/DesktopModules/MTPatch/API/TodoItems/" + self.Id(),
                        data: JSON.stringify({
                            Title: self.Title(),
                            Description: self.Description(),
                            Done: self.Done()
                        }),
                        type: "PATCH",
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            $("#loading").hide();
                            $("#todo-details-modal").modal("hide");

                            if (self.callback) {
                                self.callback();
                            }
                        }
                    });
                }
            }
        };
    };

    function ConfirmToDeleteTodoViewModel() {
        var self = this;

        self.callback = null;

        self.Id = ko.observable(null);

        self.deleteTodo = function () {
            $("#loading").show();
            $.ajax({
                url: "/DesktopModules/MTPatch/API/TodoItems/" + self.Id(),
                data: JSON.stringify({
                    IsDeleted: true
                }),
                type: "PATCH",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    $("#loading").hide();
                    $("#confirm-to-delete-todo-modal").modal("hide");

                    if (self.callback) {
                        self.callback();
                    }
                }
            });
        };
    };

    function ConfirmToPermanentlyDeleteTodoViewModel() {
        var self = this;

        self.callback = null;

        self.Id = ko.observable(null);

        self.permanentlyDeleteTodo = function () {
            $("#loading").show();
            $.ajax({
                url: "/DesktopModules/MTDelete/API/TodoItems/" + self.Id(),
                type: "DELETE",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    $("#loading").hide();
                    $("#confirm-to-permanently-delete-todo-modal").modal("hide");

                    if (self.callback) {
                        self.callback();
                    }
                }
            });
        };
    };

    var todoListViewModel = new TodoListViewModel();
    ko.applyBindings(todoListViewModel, document.getElementById("todo-list-view"));
    ko.applyBindings(todoListViewModel.todoDetailsViewModel, document.getElementById("todo-details-modal"));
    ko.applyBindings(todoListViewModel.confirmToDeleteTodoViewModel, document.getElementById("confirm-to-delete-todo-modal"));
    ko.applyBindings(todoListViewModel.confirmToPermanentlyDeleteTodoViewModel, document.getElementById("confirm-to-permanently-delete-todo-modal"));
});
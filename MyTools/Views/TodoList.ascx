<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="TodoList.ascx.cs" Inherits="HN.MyTools.Views.TodoList" %>

<div class="loading" id="loading">
    <div class="loading-inner">
    </div>
</div>

<div id="todo-list-view">
    <div class="panel panel-primary panel-single-table">
        <div class="panel-heading">
            <div class="row">
                <div class="col-xs-6">
                    <h2 class="panel-title"><%= LocalizeString("TodoList") %></h2>
                </div>
                <div class="col-xs-6 text-right">
                    <input type="checkbox" id="show-deleted-items"
                        data-bind="checked: showDeletedItems,
                            event: { change: refreshTodoList }" />
                    <label for="show-deleted-items"><%= LocalizeString("ShowDeletedItems") %></label>
                    <button class="btn btn-success" type="button"
                        data-bind="click: addTodo"><%= LocalizeString("AddNew") %></button>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <table class="table todo-list">
                <thead>
                    <tr>
                        <th><%= LocalizeString("Title") %></th>
                        <th><%= LocalizeString("Status") %></th>
                        <th class="description-column"><%= LocalizeString("Description") %></th>
                        <th class="action-column">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- ko foreach: { data: todoItems, as: 'item' } -->
                    <tr data-bind="css: { 'is-deleted': item.IsDeleted }">
                        <td data-bind="text: item.Title"></td>
                        <td>
                            <span data-bind="visible: item.Done"><%= LocalizeString("Done") %></span>
                            <span data-bind="visible: !item.Done"><%= LocalizeString("NotDone") %></span>
                        </td>
                        <td class="text-center">
                            <i class="fas fa-comment" data-bind="attr: { title: item.Description }"></i>
                        </td>
                        <td class="action-column">
                            <i class="fas fa-trash-restore-alt" title="<%= LocalizeString("Restore") %>"
                                data-bind="visible: item.IsDeleted, click: $parent.restoreTodo"></i>
                            <i class="fas fa-pencil-alt" title="<%= LocalizeString("Edit") %>"
                                data-bind="click: $parent.editTodo"></i>
                            <i class="fas fa-times-circle" title="<%= LocalizeString("Delete") %>"
                                data-bind="visible: !item.IsDeleted, click: $parent.confirmBeforeDeleteTodo"></i>
                            <i class="fas fa-trash-alt" title="<%= LocalizeString("PermanentlyDelete") %>"
                                data-bind="visible: item.IsDeleted, click: $parent.confirmToPermanentlyDeleteTodo"></i>
                        </td>
                    </tr>
                    <!-- /ko -->
                    <tr class="text-center" data-bind="visible: isReady() && todoItems().length == 0">
                        <td colspan="4"><%= LocalizeString("YouDontHaveAnyItemsInTheList") %></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<div id="todo-details-modal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">x</button>
                <h4 class="modal-title" data-bind="visible: !Id()"><%= LocalizeString("CreateNewTodo") %></h4>
                <h4 class="modal-title" data-bind="visible: Id()"><%= LocalizeString("UpdateTodo") %></h4>
            </div>
            <div class="modal-body">
                <div class="form-group" data-bind="css: { 'has-error': TitleHasError() }">
                    <label class="control-label" for="title"><%= LocalizeString("Title") %></label>
                    <input type="text" id="title" class="form-control" maxlength="100"
                        data-bind="value: Title"/>
                    <span class="help-block" data-bind="visible: TitleHasError()">
                        <%= LocalizeString("TitleIsRequired") %>
                    </span>
                </div>
                <div class="form-group">
                    <label class="control-label" for="description"><%= LocalizeString("Description") %></label>
                    <textarea rows="3" id="description" class="form-control" maxlength="300"
                        data-bind="value: Description"></textarea>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" data-bind="checked: Done" /> <%= LocalizeString("Done") %>
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><%= LocalizeString("Cancel") %></button>
                <button type="button" class="btn btn-primary"
                    data-bind="click: saveTodo"><%= LocalizeString("SaveChanges") %></button>
            </div>
        </div>
    </div>
</div>

<div id="confirm-to-delete-todo-modal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"><%= LocalizeString("DeleteTodo") %></h4>
            </div>
            <div class="modal-body">
                <%= LocalizeString("DeleteTodoConfirmation") %>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><%= LocalizeString("Cancel") %></button>
                <button type="button" class="btn btn-danger"
                    data-bind="click: deleteTodo"><%= LocalizeString("Delete") %></button>
            </div>
        </div>
    </div>
</div>

<div id="confirm-to-permanently-delete-todo-modal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"><%= LocalizeString("PermanentlyDeleteTodo") %></h4>
            </div>
            <div class="modal-body">
                <%= LocalizeString("PermanentlyDeleteTodoConfirmation") %>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><%= LocalizeString("Cancel") %></button>
                <button type="button" class="btn btn-danger"
                    data-bind="click: permanentlyDeleteTodo"><%= LocalizeString("Delete") %></button>
            </div>
        </div>
    </div>
</div>

<link href="/DesktopModules/MyTools/Content/libraries/fontawesome/css/all.min.css" rel="stylesheet" />

<script src="/Resources/Libraries/Knockout/03_03_00/knockout.js"></script>

<script src="/DesktopModules/MyTools/Content/js/todo-list.js"></script>
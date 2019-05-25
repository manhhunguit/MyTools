<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CompoundInterest.ascx.cs" Inherits="HN.MyTools.Views.CompoundInterest" %>

<div id="compound-interest-view">
    <div class="row">
        <div class="col-xs-6" id="compound-interest-1">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-8">
                            <h2 class="panel-title"><%= LocalizeString("CompoundInterest") %></h2>
                        </div>
                        <div class="col-xs-4 text-right">
                            <button type="button" class="btn btn-success" data-bind="click: showDualCompoundInterests">
                                <i class="fas fa-arrow-right" title="<%= LocalizeString("Compare") %>"
                                    data-bind="visible: !showCompoundInterest2()"></i>
                                <i class="fas fa-arrow-left" title="<%= LocalizeString("CloseCompareInterests") %>"
                                    data-bind="visible: showCompoundInterest2()"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <form>
                        <div class="row">
                            <div class="col-xs-12 col-md-6">
                                <div class="form-group" data-bind="css: { 'has-error': initialCapitalHasError() }">
                                    <label class="control-label">
                                        <%= LocalizeString("InitialCapital") %>
                                    </label>
                                    <input type="text" class="form-control initial-capital" 
                                        data-bind="value: initialCapital" />
                                    <span class="help-block" data-bind="visible: initialCapitalHasError()">
                                        <%= LocalizeString("InitialCapitalError") %>
                                    </span>
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-6">
                                <div class="form-group" data-bind="css: { 'has-error': interestHasError() }">
                                    <label class="control-label">
                                        <%= LocalizeString("Interest") %>
                                    </label>
                                    <div class="input-group">
                                        <input type="text" class="form-control interest" data-bind="value: interest" />
                                        <span class="input-group-addon">%</span>
                                    </div>
                                    <span class="help-block" data-bind="visible: interestHasError()">
                                        <%= LocalizeString("InterestError") %>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 col-md-6">
                                <div class="form-group" data-bind="css: { 'has-error': periodHasError() }">
                                    <label class="control-label">
                                        <%= LocalizeString("Period") %>
                                    </label>
                                    <div class="input-group">
                                        <input type="text" class="form-control period" data-bind="value: period" />
                                        <span class="input-group-addon"><%= LocalizeString("month(s)") %></span>
                                    </div>
                                    <span class="help-block" data-bind="visible: periodHasError()">
                                        <%= LocalizeString("PeriodError") %>
                                    </span>
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-6">
                                <div class="form-group" data-bind="css: { 'has-error': periodsHasError() }">
                                    <label class="control-label">
                                        <%= LocalizeString("Periods") %>
                                    </label>
                                    <input type="text" class="form-control periods" data-bind="value: periods" />
                                    <span class="help-block" data-bind="visible: periodsHasError()">
                                        <%= LocalizeString("PeriodsError") %>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-success"
                                data-bind="click: calculate"><%= LocalizeString("Calculate") %></button>
                            <button type="button" class="btn btn-default"
                                data-bind="click: reset"><%= LocalizeString("Reset") %></button>
                        </div>
                    </form>

                    <table class="table table-striped compound-interest-result" 
                        data-bind="visible: result().length > 0">
                        <thead>
                            <tr>
                                <th><%= LocalizeString("Period") %></th>
                                <th class="text-right"><%= LocalizeString("OpeningCapital") %></th>
                                <th class="text-right"><%= LocalizeString("ClosingCapital") %></th>
                            </tr>
                        </thead>
                        <tbody data-bind="foreach: { data: result, as: 'item' }">
                            <tr>
                                <td data-bind="text: item.period"></td>
                                <td class="text-right" data-bind="text: item.openingCapital"></td>
                                <td class="text-right" data-bind="text: item.closingCapital"></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="text-center">
                                    <%= LocalizeString("After") %> <span data-bind="text: totalPeriods"></span> 
                                    <%= LocalizeString("month(s)") %> 
                                    <%= LocalizeString("youAreGoingToHave") %> <span data-bind="text: closingCapital"></span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        
        <div class="col-xs-6" id="compound-interest-2" data-bind="visible: showCompoundInterest2()">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h2 class="panel-title"><%= LocalizeString("CompoundInterest") %></h2>
                </div>
                <div class="panel-body">
                    <form>
                        <div class="row">
                            <div class="col-xs-12 col-md-6">
                                <div class="form-group" data-bind="css: { 'has-error': initialCapitalHasError() }">
                                    <label class="control-label">
                                        <%= LocalizeString("InitialCapital") %>
                                    </label>
                                    <input type="text" class="form-control initial-capital"
                                        data-bind="value: initialCapital" />
                                    <span class="help-block" data-bind="visible: initialCapitalHasError()">
                                        <%= LocalizeString("InitialCapitalError") %>
                                    </span>
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-6">
                                <div class="form-group" data-bind="css: { 'has-error': interestHasError() }">
                                    <label class="control-label">
                                        <%= LocalizeString("Interest") %>
                                    </label>
                                    <div class="input-group">
                                        <input type="text" class="form-control interest" data-bind="value: interest" />
                                        <span class="input-group-addon">%</span>
                                    </div>
                                    <span class="help-block" data-bind="visible: interestHasError()">
                                        <%= LocalizeString("InterestError") %>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 col-md-6">
                                <div class="form-group" data-bind="css: { 'has-error': periodHasError() }">
                                    <label class="control-label">
                                        <%= LocalizeString("Period") %>
                                    </label>
                                    <div class="input-group">
                                        <input type="text" class="form-control period" data-bind="value: period" />
                                        <span class="input-group-addon"><%= LocalizeString("month(s)") %></span>
                                    </div>
                                    <span class="help-block" data-bind="visible: periodHasError()">
                                        <%= LocalizeString("PeriodError") %>
                                    </span>
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-6">
                                <div class="form-group" data-bind="css: { 'has-error': periodsHasError() }">
                                    <label class="control-label">
                                        <%= LocalizeString("Periods") %>
                                    </label>
                                    <input type="text" class="form-control periods" data-bind="value: periods" />
                                    <span class="help-block" data-bind="visible: periodsHasError()">
                                        <%= LocalizeString("PeriodsError") %>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-success"
                                data-bind="click: calculate"><%= LocalizeString("Calculate") %></button>
                            <button type="button" class="btn btn-default"
                                data-bind="click: reset"><%= LocalizeString("Reset") %></button>
                        </div>
                    </form>

                    <table class="table table-striped compound-interest-result" 
                        data-bind="visible: result().length > 0">
                        <thead>
                            <tr>
                                <th><%= LocalizeString("Period") %></th>
                                <th class="text-right"><%= LocalizeString("OpeningCapital") %></th>
                                <th class="text-right"><%= LocalizeString("ClosingCapital") %></th>
                            </tr>
                        </thead>
                        <tbody data-bind="foreach: { data: result, as: 'item' }">
                            <tr>
                                <td data-bind="text: item.period"></td>
                                <td class="text-right" data-bind="text: item.openingCapital"></td>
                                <td class="text-right" data-bind="text: item.closingCapital"></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="text-center">
                                    <%= LocalizeString("After") %> <span data-bind="text: totalPeriods"></span> 
                                    <%= LocalizeString("month(s)") %> 
                                    <%= LocalizeString("youAreGoingToHave") %> <span data-bind="text: closingCapital"></span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<link href="/DesktopModules/MyTools/Content/libraries/fontawesome/css/all.min.css" rel="stylesheet" />

<script src="/Resources/Libraries/Knockout/03_03_00/knockout.js"></script>
<script src="/DesktopModules/MyTools/Content/libraries/jquery.mask/jquery.mask.js"></script>

<script src="/DesktopModules/MyTools/Content/js/compound-interest.js"></script>
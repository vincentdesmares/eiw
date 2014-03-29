/**
 * Created by cold on 2/15/14.
 *
 * EWI : Everything Is Widget (mostly)
 *
 * A javascript library for single page applications that focus on simplicity, customization and NO MORE
 *
 * Application
 * An application is a group of page with a layout. Only one application can be instantiated by BROWSER dom document
 * It's the only global object of the window
 *
 * Page
 * A page is a group of widget with a layout. A page can be bound to the path of the URL
 *
 * Widget
 * A widget is a simple feature with a layout. The widget can have states bound to the query string of the URL
 *
 *
 *
 * ######### Application workflow ############
 *
 * App
 * # bootstrap
 * # load
 * # render
 *   Pages
 *   # load
 *   # render
 *     Widgets
 *     # load
 *     # render
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *  http://www.asciiflow.com/#Draw
 */

/**
 * The Namespace of the EIW library
 * @todo replace all those define by a tool that build the EIW
 * @namespace
 * @type {{Object}}
 *
 * var class = Eiw.CreateWidgetClass('city', {route:'/awdawd/'});
 * widget.prototype.test = function() {};
 *
 * var widget = Eiw.InstantiateWidget('city');
 *
 * @property {Eiw.Application} Application
 */
Eiw = {
    classes : {},
    page : {},
    template : {},
    Widget : {
        Plugin : {
            Bootstrap : {

            }
        }
    },
    Prefab : {
        Widget : {
            Bootstrap : {

            }
        }
    },
    Application : {},

    CreateWidget : function(widgetId) {
        this.classes[widgetId] = function () {
            this.id          = 'city-map';
            this.api         = '/frontoffice/city/json/id/1/';
        };

        $.extend(true, this.classes[widgetId].prototype, new Eiw.Widget.Abstract());

        return this.classes[widgetId];
    },

    InstantiateWidget : function(widgetId) {
        return new this.classes[widgetId]();
    }
};
# Everything Is Widget: EIW

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

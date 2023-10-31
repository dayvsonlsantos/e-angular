## Angular

To tells angular that class is not just a normal class, but a special class (component). We use decorators;

## Decorators

Decorators are a Typescript feature wich allow you to enhace your classes, for exemple.

We can use templateUrl property and then inform the component's html url.
Or, que can already uses the HTML inline, just by adding template instead of tmeplateUrl, Like this:

        template: `
            <div>
                <p>Hello World!</p>
            </div>
        `

It also occurs when we talk about styles, we could use a external file, but also a inline css:

    styles: [`
        h3 {
            color: #ffffff
        }
    `]

## Selector

We can use the selector normaly, just typing it's name in HTML file.
Or, we could use it as a atribute. To do so:
    selector: ['app-server'],

Then, to call this in the HTML, we could use a div tag:
    <div app-server>
    </div>

Another way, is to select it by class. Just is need to add a . at the beginning:

    selector: '.app-server',

Then, we call it like this:
    
    <div class = "app-server"></div>

But, anyway, ID does not work on Angular, neither pseudo selectors as hover for example. And usually, we use the component way: selector: 'app-server'

## Databinding

It's the communication between your component and the template (what users sees);

Square Brackets [] -> Indicates to angular that you're using property binding. That we want to dynamically bind some property.

## Passing and Using Data with Event Binding

- $event -> It's king of a reserved variable name, you can use in the template when using event binding. Because, it gives us access to the event data.

## Directives

Directives are instruction in the DOM, example: ngIf

Unlike structural directives as ngIf, attribute directives don't add or remove elements. They only change the element they were placed on.
Example:
    ngStyle -> Allow us to change the CSS style itself;
    ngClass -> Allow us to dynamically add or remove the CSS classes;


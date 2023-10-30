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
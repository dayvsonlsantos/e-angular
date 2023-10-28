# Angular
- Framework / Development platform built on TS;

<br>

## Components
- Building blocks that compose an application;
- Includes a TS class, decorator, HTML template and CSS;

<br>

## Templates
- It's present in every component and declares how that component renders.
- You define this template either inline or by file path.
- Angular automatically updates the rendered DOM when your component's state changes

> Angular also supports property bindings, to help you set values for properties and attributes of HTML elements and pass values to your application's presentation logic.
            
        <p
            [id]="sayHelloId"
            [style.color]="fontColor">
            You can set my color in the component!
        </p>
    
> Declare event listeners to listen for and respond to user actions such as keystrokes, mouse movements, clicks, and touches. You declare an event listener by specifying the event name in parentheses:
        
        <button
            type="button"
            [disabled]="!canClick"
            (click)="sayMessage()">
            Trigger alert message
        </button>
    
        sayMessage() {
            alert(this.message);
        }

<br>
<br>

### Code Example:

> hello-world-bindings.component.html

    <button
        type="button"
        [disabled]="!canClick"
        (click)="sayMessage()">
        Trigger alert message
    </button>

    <p
        [id]="sayHelloId"
        [style.color]="fontColor">
        You can set my color in the component!
    </p>

    <p>My color is {{ fontColor }}</p>

> hello-world-bindings.component.ts

    import { Component } from '@angular/core';

    @Component ({
        <!-- component name  -->
        selector: 'hello-world-bindings', 

        <!-- component template  -->
        templateUrl: './hello-world-bindings.component.html'
    })
    
    export class HelloWorldBindingsComponent {
        
        <!-- Works as props on react -->
        
        fontColor = 'blue';
        sayHelloId = 1;
        canClick = true;
        message = 'Hello, World';

        sayMessage() {
            alert(this.message);
        }
    }

<br>
<br>

### Features by directives

- Add features to your templates by using directives. The most popular directives in Angular are *ngIf and *ngFor

> hello-world-ngif.component.ts

    import { Component } from '@angular/core';

    @Component({
        selector: 'hello-world-ngif',
        templateUrl: './hello-world-ngif.component.html'
    })

    export class HelloWorldNgIfComponent {
        message = "I'm read only!";
        canEdit = false;

        onEditClick() {
            this.canEdit = !this.canEdit;
            if (this.canEdit) {
            this.message = 'You can edit me!';
            } else {
            this.message = "I'm read only!";
            }
        }
    }

> hello-world-ngif.component.html

    <h2>Hello World: ngIf!</h2>

    <button type="button" (click)="onEditClick()">Make text editable!</button>

    <div *ngIf="canEdit; else noEdit">
        <p>You can edit the following paragraph.</p>
    </div>

    <ng-template #noEdit>
        <p>The following paragraph is read only. Try clicking the button!</p>
    </ng-template>

    <p [contentEditable]="canEdit">{{ message }}</p>

<br>

## Directives
- Attribute directives listen to and modify the behavior of other HTML elements, attributes, properties and components.

### Most common attribute directive:

- NgClass -> Adds and removes a set of CSS classes.
- NgStyle -> Adds and removes a set of HTML styles.
- NgModel -> Adds two-way data binding to an HTML form element.

> Using NgClass with an expression

- On the element you'd like to style, add [ngClass] and set it equal to an expression. In this case, isSpecial is a boolean set to true in app.component.ts. Because isSpecial is true, ngClass applies the class of special to the <div>

        <!-- toggle the "special" class on/off with a property -->
        <div [ngClass]="isSpecial ? 'special' : ''">This div is special</div>

<br>

## Dependency Injection

- https://angular.io/guide/dependency-injection

<br>

## Angular CLI
 Is the fastest, straightforward, and recommended way to develop Angular applications.

- ng build | Compiles an Angular application into an output directory.
- ng serve | Builds and serves your application, rebuilding on file changes.
- ng generate | Generates or modifies files based on a schematic.
- ng test | Runs unit tests on a given project.
- ng e2e | Builds and serves an Angular application, then runs end-to-end tests.
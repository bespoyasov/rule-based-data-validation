# Declarative validation in rule-based approach and functional programming

[Sample frontend app](https://bespoyasov.ru/showcase/declarative-validation/) with HTML-form data validation made using a rule-based approach, written in TypeScript and (almost pure) functional programming paradigm.

## About Project

Client data validation is complicated. It requires different types of logic to work together, and sometimes difficult to distinguish those types properly. This can result in a messy code.

The rule-based approach helps to separate domain, UI, and infrastructure logic. It makes the validation rules independent from the other code and reusable in different projects.

Read more about this approach in my posts:

- 🇬🇧 [Declarative validation in rule-based approach](#)
- 🇷🇺 [Декларативная валидация данных в rule-based стиле](#)

## App Example

For this post, I created a sample app—Mars colonizer application form.

This form contains fields with different data types (name, date, email, phone, password), different sets of rules and relationships, and even interdependent rules.

[Check out the form](https://bespoyasov.ru/showcase/declarative-validation/) yourself to see how it's working!

## Source Code

Although the main idea is explained in the posts, I left some comments in the source code. Check out the [validation rules](https://github.com/bespoyasov/rule-based-data-validation/blob/main/src/application/validation.ts) and the [validation infrastructure code](https://github.com/bespoyasov/rule-based-data-validation/blob/main/src/services/validation.ts) to feel the idea behind the rule-based validation.

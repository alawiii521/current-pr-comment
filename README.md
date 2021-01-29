# Create a comment in the current pull request
Creates a comment in the current pull request

## Action inputs

| Name | Description |
| --- | --- | 
| `GITHUB_TOKEN` | [GitHub provides a token that you can use to authenticate on behalf of GitHub Actions.](https://docs.github.com/en/actions/reference/authentication-in-a-workflow) 
| `comment` | The comment that will be created

## Usage

```yaml

on: 
  pull_request:
    types: [opened]

jobs:
  create_comment:
    runs-on: ubuntu-latest
    name: Create a comment
    steps:
      # To use this repository's private action,
      # you must check out the repository
      - name: Checkout
        uses: actions/checkout@v2
      - name: Create comment
        uses: ./ # Uses an action in the root directory
        with:
          comment: "Hello world!"
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

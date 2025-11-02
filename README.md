# Sol-Sentry

![Sol Sentry Logo](assets/sol-sentry-logo.png)

Welcome to Sol-Sentry, an innovative AI tool designed for enhancing the security and efficiency of Solana smart contract development. Utilizing advanced AI analysis through GPT-4, Sol-Sentry offers in-depth analysis, predictive threat modeling, and best practice recommendations to fortify blockchain projects.

## 🌐 Live Site

Visit our GitHub Pages site at **[https://cywf.github.io/Sol-Sentry/](https://cywf.github.io/Sol-Sentry/)**

### Site Features

Our interactive site provides:

- **🏠 Home** - Project overview and quick links
- **🔍 Audit Explorer** - Browse Solana contracts, GPT function specs, and Terraform infrastructure with code previews and Anchor pattern detection
- **📊 Statistics** - Repository stats, language breakdown, and commit activity
- **💬 Discussions** - Latest community discussions
- **📋 Development Board** - Project progress and task tracking
- **🐛 Create Issue** - Quick access to report bugs, request features, or suggest documentation improvements
- **📚 Documentation** - Complete usage guide and integration instructions
- **📈 Visualizer** - Interactive Mermaid diagrams (when available)
- **🚀 App** - Direct link to the Streamlit application

The site automatically indexes and displays all contracts, GPT functions, and infrastructure modules with best-effort parsing. Code previews show the first ~120 lines of each contract, and Anchor patterns (`#[account]`, `#[program]`, etc.) are detected and highlighted.

**Note:** The Streamlit app at [https://sol-sentry.streamlit.app/](https://sol-sentry.streamlit.app/) may sleep when inactive and will wake automatically on first visit.

## Installation

To start using Sol-Sentry, clone the repository and set up your environment:

```bash
git clone https://github.com/cywf/Sol-Sentry.git
cd Sol-Sentry
```
Follow the setup instructions specific to your system.

## Usage

Sol-Sentry offers various interfaces for users to analyze their Solana smart contracts, providing flexibility and accessibility. Here’s how to get started:

### Streamlit Interface

The Streamlit interface provides a user-friendly web application to interact with Sol-Sentry. To use it, follow these steps:

1.	Navigate to the Sol-Sentry directory.
2.	Run the Streamlit app:

```bash
streamlit run scripts/app.py
```

3.	Follow the on-screen instructions to upload or paste your smart contract code for analysis.

### CLI Tool

Sol-Sentry can also be used via a command-line interface. To analyze your smart contracts, run:

```bash
sol-sentry analyze <path-to-your-contract>
```
Replace <path-to-your-contract> with the path to the Solana program file you wish to analyze.

### Interpreting Analysis Reports

Sol-Sentry generates a detailed report highlighting potential vulnerabilities, performance optimizations, and security recommendations. Review the report to make informed decisions about your smart contract development.

### Continuous Integration

Integrate Sol-Sentry into your CI/CD pipeline for automated code analysis. Example with GitHub Actions:

```yaml
name: Solana Smart Contract CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Install Sol-Sentry
      run: |
        # Add installation commands here
    - name: Analyze Smart Contracts
      run: sol-sentry analyze src/program.rs
```

**Important:** When using Sol-Sentry in CI, all analysis runs server-side during the build process. No secrets or sensitive data are exposed client-side on the GitHub Pages site. The site only displays static indexes and public repository information.

## GitHub Pages Automation

The GitHub Pages site is automatically built and deployed via GitHub Actions on every push to `main`. The workflow:

1. **Indexes repository content** - Scans contracts, GPT functions, and Terraform modules
2. **Fetches public data** - Retrieves repository statistics, discussions, and project board data using GitHub API
3. **Copies assets** - Includes logo and other static assets
4. **Discovers diagrams** - Finds and copies any `.mmd` Mermaid diagram files
5. **Builds the site** - Compiles the Astro + React application
6. **Deploys to Pages** - Publishes the static site

All indexing uses best-effort regex parsing and truncates code previews for security and performance. The workflow runs with limited GitHub API access and never exposes repository secrets.

## Getting Help

For assistance, visit our [GitHub Pages site](https://cywf.github.io/Sol-Sentry/) or join our community on the [Discussions](https://github.com/cywf/Sol-Sentry/discussions) page.

## Contributing

Contributions are welcome! If you have suggestions or want to add new features, please open an [issue](https://github.com/cywf/Sol-Sentry/issues) or submit a [pull request](https://github.com/cywf/Sol-Sentry/pulls). See our [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

## Support

For support, visit our [Discussions](https://github.com/cywf/Sol-Sentry/discussions) page or open an [issue](https://github.com/cywf/Sol-Sentry/issues).

## License

Sol-Sentry is released under the [MIT License](https://github.com/cywf/Sol-Sentry/blob/main/LICENSE).
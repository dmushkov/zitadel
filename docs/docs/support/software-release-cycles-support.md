---
title: Support States & Software Release Cycle
---

## Support States

It's important to note that support may differ depending on the feature, and not all features may be fully supported. 
We always strive to provide the best support possible for our customers and community,
but we may not be able to provide immediate or comprehensive support for all features.
Also the support may differ depending on your contracts. Read more about it on our [Legal page](/docs/legal)

### Supported

Supported features are those that are guaranteed to work as intended and are fully tested by our team.
If you encounter any issues with a supported feature, please contact us by creating a [bug report](https://github.com/zitadel/zitadel/issues/new/choose).
We will review the issues according to our [product management process](https://github.com/zitadel/zitadel/blob/main/CONTRIBUTING.md#product-management).

In case you are eligible to [support services](/docs/legal/support-services) get in touch via one of our support channels and we will provide prompt response to the issues you may experience and make our best effort to assist you to find a resolution.

:::info Security Issues
Please report any security issues immediately to the indicated address in our [security.txt](https://zitadel.com/.well-known/security.txt)
:::

### Enterprise Supported

Enterprise supported features are those where we provide support only to users eligible for enterprise [support services](/docs/legal/support-services).
These features should be functional for eligible users, but may have some limitations for a broader use.

If you encounter issues with an enterprise supported feature and you are eligible for enterprise support services, we will provide a prompt response to the issues you may experience and make our best effort to assist you to find a resolution.

**Enterprise supported features**

- Database PostgreSQL
- LDAP Identity Provider
- [Terraform Provider](https://github.com/zitadel/terraform-provider-zitadel)

### Community Supported

Community supported features are those that have been developed by our community and may not have undergone extensive testing or support from our team. 
If you encounter issues with a community supported feature, we encourage you to seek help from our community or other online resources, where other users can provide assistance:

- Join our [Discord Chat](https://zitadel.com/chat)
- Search [Github Issues](https://github.com/search?q=org%3Azitadel+&type=issues) and report a new issue
- Search [Github Discussions](https://github.com/search?q=org%3Azitadel+&type=discussions) and open a new discussion as question or idea

## Software Release Cycle

It's important to note that both Alpha and Beta software can have breaking changes, meaning they are not backward-compatible with previous versions of the software.
Therefore, it's recommended to use caution when using Alpha and Beta software, and to always back up important data before installing or testing new software versions.

Only features in General Availability will be covered by support services.

We encourage our community to test Alpha and Beta software and provide feedback via our [Discord Chat](https://zitadel.com/chat). 

### Alpha

The Alpha state is our initial testing phase. 
It is available to everyone, but it is not yet complete and may contain bugs and incomplete features.
We recommend that users exercise caution when using Alpha software and avoid using it for critical tasks, as support is limited during this phase.

### Beta

The Beta state comes after the Alpha phase and is a more stable version of the software. 
It is feature-complete, but may still contain bugs that need to be fixed before general availability.
While it is available to everyone, we recommend that users exercise caution when using Beta software and avoid using it for critical tasks. 
During this phase, support is limited as we focus on testing and bug fixing. 

### General Available

Generally available features are available to everyone and have the appropriate test coverage to be used for critical tasks.
The software will be backwards-compatible with previous versions, for exceptions we will publish a [technical advisory](https://zitadel.com/docs/support/technical_advisory).
Features in General Availability are not marked explicitly.

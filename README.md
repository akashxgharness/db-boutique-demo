# Boutique Microservices

A minimal Kubernetes microservices application (frontend, productcatalog, checkout) deployable via Helm.

## Image Configuration

| Service | Image | Tag |
|---------|-------|-----|
| Frontend | akashxg/eks-config-ui | frontend |
| Product Catalog | akashxg/eks-config-ui | catalog |
| Checkout | akashxg/eks-config-ui | checkout |

## Microservices

| Service | Port | Role |
|---------|------|------|
| frontend | 8080 | Web UI |
| productcatalog | 3550 | Product listing API |
| checkout | 5050 | Checkout API |

## Prerequisites

- Kubernetes cluster
- NGINX Ingress Controller
- Helm 3

## Quick Start

### 1. Install the chart

```bash
# Create namespace and install
helm install boutique ./helm/boutique -n boutique --create-namespace

# Or with custom values
helm install boutique ./helm/boutique -n boutique --create-namespace \
  --set ingress.host=boutique.example.com
```

### 2. Access the app

Add to `/etc/hosts`:
```
<INGRESS_IP> boutique.local
```

Then open http://boutique.local in a browser.

## Values Reference

| Value | Default | Description |
|-------|---------|-------------|
| `frontend.image.repository` | `akashxg/eks-config-ui` | Frontend image |
| `frontend.image.tag` | `frontend` | Frontend image tag |
| `productcatalog.image.repository` | `akashxg/eks-config-ui` | Product catalog image |
| `productcatalog.image.tag` | `catalog` | Product catalog image tag |
| `checkout.image.repository` | `akashxg/eks-config-ui` | Checkout image |
| `checkout.image.tag` | `checkout` | Checkout image tag |
| `ingress.host` | `boutique.local` | Ingress hostname |
| `ingress.className` | `nginx` | Ingress class |
| `namespace` | `boutique` | Target namespace |

## Project Structure

```
harnessdbdemo/
├── helm/boutique/           # Helm chart
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
│       ├── _helpers.tpl
│       ├── namespace.yaml
│       ├── frontend/
│       ├── productcatalog/
│       └── checkout/
├── services/
│   ├── frontend/
│   ├── productcatalog/
│   └── checkout/
└── README.md
```

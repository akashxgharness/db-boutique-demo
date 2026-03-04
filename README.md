# Boutique Microservices

A minimal Kubernetes microservices application (frontend, productcatalog, checkout) with canary deployment and NGINX traffic splitting. The UI shows live canary traffic split.

## Image Configuration

| Service | Image | Tag |
|---------|-------|-----|
| Frontend (stable + canary) | akashxg/eks-config-ui | frontend |
| Product Catalog | akashxg/eks-config-ui | catalog |
| Checkout | akashxg/eks-config-ui | checkout |

## Canary Deployment

The chart deploys two frontend deployments (stable + canary) with NGINX Ingress splitting traffic. The UI at `/` shows the live traffic split and which variant served each request.

- **canary.weight** (default: 20) - Percentage of traffic to canary. Override via `--set canary.weight=N` to match Harness pipeline.

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
| `canary.enabled` | `true` | Deploy canary frontend and NGINX canary ingress |
| `canary.weight` | `20` | NGINX canary traffic % (override to match Harness) |
| `stable.image.repository` | `akashxg/eks-config-ui` | Stable frontend image |
| `stable.image.tag` | `frontend` | Stable frontend tag |
| `canary.image.repository` | `akashxg/eks-config-ui` | Canary frontend image |
| `canary.image.tag` | `frontend` | Canary frontend tag |
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

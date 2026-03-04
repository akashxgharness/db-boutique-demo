# Boutique Microservices with Canary Deployment

A minimal Kubernetes microservices application that mirrors the **Harness End2End Delivery Pipeline** Deploy-to-Prod canary stage. The frontend includes an embedded UI that visualizes the canary deployment in real time.

## Pipeline Mapping

| Harness Pipeline Stage | This Helm Chart |
|------------------------|-----------------|
| Build-Test-Push (boutique-web-ui:1.0.N) | `stable.image.tag` / `canary.image.tag` |
| Deploy to Dev (K8s Rolling) | Single stable deployment |
| Deploy to QA (Blue-Green) | N/A (focused on prod canary) |
| Deploy to Prod (K8sCanaryDeploy 5%) | `canary.enabled`, `canary.weight: 5` |
| K8sCanaryDelete + Rolling | Set `canary.enabled: false` |

## Microservices

| Service | Port | Role |
|---------|------|------|
| frontend | 8080 | Web UI + canary visualization dashboard |
| productcatalog | 3550 | Product listing API |
| checkout | 5050 | Checkout API |

## Prerequisites

- Kubernetes cluster
- NGINX Ingress Controller
- Helm 3

## Quick Start

### 1. Build and push images (or use pre-built)

```bash
# Build from services/
docker build -t boutique-web-ui:stable services/frontend
docker build -t boutique-web-ui:canary services/frontend
docker build -t boutique-productcatalog:1.0.0 services/productcatalog
docker build -t boutique-checkout:1.0.0 services/checkout
```

### 2. Install the chart

```bash
# Create namespace and install
helm install boutique ./helm/boutique -n boutique --create-namespace

# Or with custom values
helm install boutique ./helm/boutique -n boutique --create-namespace \
  --set canary.weight=10 \
  --set ingress.host=boutique.example.com
```

### 3. Access the canary dashboard

Add to `/etc/hosts`:
```
<INGRESS_IP> boutique.local
```

Then open http://boutique.local in a browser. The dashboard shows:
- Traffic split (stable % vs canary %)
- Current request version and variant
- Backend service health

## Toggling Canary

### Enable canary (5% traffic to new version)

```bash
helm upgrade boutique ./helm/boutique -n boutique \
  --set canary.enabled=true \
  --set canary.weight=5 \
  --set canary.image.tag=1.0.42 \
  --set stable.image.tag=1.0.41
```

### Disable canary (full rollout complete)

```bash
helm upgrade boutique ./helm/boutique -n boutique \
  --set canary.enabled=false \
  --set stable.image.tag=1.0.42
```

### Adjust canary weight (e.g., 10% → 50% → 100%)

```bash
helm upgrade boutique ./helm/boutique -n boutique \
  --set canary.weight=50
```

## Values Reference

| Value | Default | Description |
|-------|---------|-------------|
| `canary.enabled` | `true` | Deploy canary frontend and canary ingress |
| `canary.weight` | `5` | NGINX canary traffic weight (0–100) |
| `canary.image.tag` | `canary` | Canary frontend image tag |
| `stable.image.tag` | `stable` | Stable frontend image tag |
| `frontend.replicaCount` | `2` | Stable frontend replicas |
| `frontend.canary.replicaCount` | `1` | Canary frontend replicas |
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
│       ├── frontend/        # Stable + canary deployments, services, ingress
│       ├── productcatalog/
│       └── checkout/
├── services/
│   ├── frontend/            # Express app with canary UI
│   ├── productcatalog/
│   └── checkout/
└── README.md
```

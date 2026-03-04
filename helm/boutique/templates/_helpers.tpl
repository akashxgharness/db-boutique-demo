{{/*
Expand the name of the chart.
*/}}
{{- define "boutique.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "boutique.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "boutique.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "boutique.labels" -}}
helm.sh/chart: {{ include "boutique.chart" . }}
{{ include "boutique.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "boutique.selectorLabels" -}}
app.kubernetes.io/name: {{ include "boutique.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Frontend stable selector labels
*/}}
{{- define "boutique.frontendStableSelectorLabels" -}}
{{ include "boutique.selectorLabels" . }}
app.kubernetes.io/component: frontend
app.kubernetes.io/variant: stable
{{- end }}

{{/*
Frontend canary selector labels
*/}}
{{- define "boutique.frontendCanarySelectorLabels" -}}
{{ include "boutique.selectorLabels" . }}
app.kubernetes.io/component: frontend
app.kubernetes.io/variant: canary
{{- end }}

{{/*
Productcatalog selector labels
*/}}
{{- define "boutique.productcatalogSelectorLabels" -}}
{{ include "boutique.selectorLabels" . }}
app.kubernetes.io/component: productcatalog
{{- end }}

{{/*
Checkout selector labels
*/}}
{{- define "boutique.checkoutSelectorLabels" -}}
{{ include "boutique.selectorLabels" . }}
app.kubernetes.io/component: checkout
{{- end }}

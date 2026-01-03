# Pipeline Programs Data Registry

## Overview

Pipeline program verileri `pipeline-programs.json` dosyasında tutulmaktadır. Bu JSON dosyası pipeline sayfası tarafından dinamik olarak yüklenir ve tabloya render edilir.

## Data Structure

```json
{
  "program": "NXE-91-M",
  "animal": "Dairy cow",
  "indication": "Subclinical and clinical mastitis",
  "stages": {
    "discovery": true,
    "proofOfConcept": true,
    "controlled": true,
    "pivotalStudy": true,
    "commercially": false
  }
}
```

## Location

- **Data File**: `data/pipeline-programs.json`
- **Consumer**: `pipeline.html` (JavaScript ile yüklenir)

## Loading

Pipeline sayfası yüklendiğinde `loadPipelineTable()` fonksiyonu JSON dosyasını fetch eder ve `renderPipelineTable()` ile tabloyu oluşturur.

## Data Validation

- Program kodları unique olmalı (case-sensitive)
- Animal değerleri: "Dairy cow", "Cat", "Dog", "Calf"
- Indication değerleri: tam metin (trim edilmiş)
- Stages: boolean değerler (true/false)


import React, { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  Target,
  UsersRound,
} from "lucide-react";

const RAW_DATA = {"metadata":{"anio":2026,"mes":"Agosto","filasProcesadas":2081,"estructura":"CENTRO > HABILIDAD EJECUTIVO > frente","cumplimiento":"decimal; 0.70 equivale a 70%","reglas":{"q1":"SUM(REALIZADO Q1) / SUM(A REALIZAR Q1)","q2":"SUM(REALIZADO Q2) / SUM(A REALIZAR Q2)","mensualCallback":"(SUM(REALIZADO Q1)+SUM(REALIZADO Q2)) / (SUM(A REALIZAR Q1)+SUM(A REALIZAR Q2))","mensualCoachingGrupal":"(SUM(REALIZADO Q1)+SUM(REALIZADO Q2)) / (SUM(A REALIZAR Q1)+SUM(A REALIZAR Q2))","mensualCoachingIndividual":"SUM(ACUMULADO MENDUAL REALIZADO) / SUM(ACUMULADO MENSUAL A REALIZAR)"},"notaColumnasFuente":{"solicitadoPorUsuario":["ACUMULADO MENSUAL Realizado","ACUMUNADO MENSUAL A REALIZAR"],"enExcel":["ACUMULADO MENDUAL REALIZADO","ACUMULADO MENSUAL A REALIZAR"],"criterio":"Se usaron los encabezados reales del Excel."}},"centros":[{"centro":"A365 PERU","resumen":{"coachingIndividual":{"q1":{"realizado":149,"aRealizar":169,"cumplimiento":0.8817},"q2":{"realizado":154,"aRealizar":185,"cumplimiento":0.8324},"mensual":{"realizado":145,"aRealizar":186,"cumplimiento":0.7796,"fuente":"columnas_acumuladas"},"usuarios":186,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":27,"aRealizar":34,"cumplimiento":0.7941},"q2":{"realizado":28,"aRealizar":34,"cumplimiento":0.8235},"mensual":{"realizado":55,"aRealizar":68,"cumplimiento":0.8088,"fuente":"q1_mas_q2"},"usuarios":17,"canales":["VOZ"]}},"habilidades":[{"habilidad":"ADULTO MAYOR","frentes":{"coachingIndividual":{"q1":{"realizado":13,"aRealizar":14,"cumplimiento":0.9286},"q2":{"realizado":11,"aRealizar":14,"cumplimiento":0.7857},"mensual":{"realizado":10,"aRealizar":14,"cumplimiento":0.7143,"fuente":"columnas_acumuladas"},"usuarios":14,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":4,"aRealizar":4,"cumplimiento":1.0},"q2":{"realizado":3,"aRealizar":4,"cumplimiento":0.75},"mensual":{"realizado":7,"aRealizar":8,"cumplimiento":0.875,"fuente":"q1_mas_q2"},"usuarios":2,"canales":["VOZ"]}}},{"habilidad":"FRONT HOGAR FIBRA","frentes":{"coachingIndividual":{"q1":{"realizado":31,"aRealizar":32,"cumplimiento":0.9688},"q2":{"realizado":25,"aRealizar":32,"cumplimiento":0.7812},"mensual":{"realizado":25,"aRealizar":33,"cumplimiento":0.7576,"fuente":"columnas_acumuladas"},"usuarios":33,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":3,"aRealizar":6,"cumplimiento":0.5},"q2":{"realizado":4,"aRealizar":6,"cumplimiento":0.6667},"mensual":{"realizado":7,"aRealizar":12,"cumplimiento":0.5833,"fuente":"q1_mas_q2"},"usuarios":3,"canales":["VOZ"]}}},{"habilidad":"RECLAMOS 105 (FIBRA COMERCIAL)","frentes":{"coachingIndividual":{"q1":{"realizado":15,"aRealizar":15,"cumplimiento":1.0},"q2":{"realizado":16,"aRealizar":16,"cumplimiento":1.0},"mensual":{"realizado":16,"aRealizar":16,"cumplimiento":1.0,"fuente":"columnas_acumuladas"},"usuarios":16,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":2,"aRealizar":2,"cumplimiento":1.0},"q2":{"realizado":2,"aRealizar":2,"cumplimiento":1.0},"mensual":{"realizado":4,"aRealizar":4,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":1,"canales":["VOZ"]}}},{"habilidad":"S2S HOGAR","frentes":{"coachingIndividual":{"q1":{"realizado":20,"aRealizar":22,"cumplimiento":0.9091},"q2":{"realizado":26,"aRealizar":27,"cumplimiento":0.963},"mensual":{"realizado":24,"aRealizar":27,"cumplimiento":0.8889,"fuente":"columnas_acumuladas"},"usuarios":27,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":5,"aRealizar":6,"cumplimiento":0.8333},"q2":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"mensual":{"realizado":11,"aRealizar":12,"cumplimiento":0.9167,"fuente":"q1_mas_q2"},"usuarios":3,"canales":["VOZ"]}}},{"habilidad":"S2S MOVIL 2.0","frentes":{"coachingIndividual":{"q1":{"realizado":37,"aRealizar":53,"cumplimiento":0.6981},"q2":{"realizado":39,"aRealizar":58,"cumplimiento":0.6724},"mensual":{"realizado":33,"aRealizar":58,"cumplimiento":0.569,"fuente":"columnas_acumuladas"},"usuarios":58,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":7,"aRealizar":10,"cumplimiento":0.7},"q2":{"realizado":7,"aRealizar":10,"cumplimiento":0.7},"mensual":{"realizado":14,"aRealizar":20,"cumplimiento":0.7,"fuente":"q1_mas_q2"},"usuarios":5,"canales":["VOZ"]}}},{"habilidad":"TÉCNICO","frentes":{"coachingIndividual":{"q1":{"realizado":33,"aRealizar":33,"cumplimiento":1.0},"q2":{"realizado":37,"aRealizar":38,"cumplimiento":0.9737},"mensual":{"realizado":37,"aRealizar":38,"cumplimiento":0.9737,"fuente":"columnas_acumuladas"},"usuarios":38,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"q2":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"mensual":{"realizado":12,"aRealizar":12,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":3,"canales":["VOZ"]}}}]},{"centro":"A365 Peru","resumen":{"callback":{"q1":{"realizado":288,"aRealizar":410,"cumplimiento":0.7024},"q2":{"realizado":211,"aRealizar":171,"cumplimiento":1.2339},"mensual":{"realizado":499,"aRealizar":581,"cumplimiento":0.8589,"fuente":"q1_mas_q2"},"usuarios":234,"canales":["VOZ"]}},"habilidades":[{"habilidad":"ADULTO MAYOR","frentes":{"callback":{"q1":{"realizado":35,"aRealizar":33,"cumplimiento":1.0606},"q2":{"realizado":26,"aRealizar":11,"cumplimiento":2.3636},"mensual":{"realizado":61,"aRealizar":44,"cumplimiento":1.3864,"fuente":"q1_mas_q2"},"usuarios":19,"canales":["VOZ"]}}},{"habilidad":"FRONT HOGAR FIBRA","frentes":{"callback":{"q1":{"realizado":57,"aRealizar":76,"cumplimiento":0.75},"q2":{"realizado":39,"aRealizar":30,"cumplimiento":1.3},"mensual":{"realizado":96,"aRealizar":106,"cumplimiento":0.9057,"fuente":"q1_mas_q2"},"usuarios":43,"canales":["VOZ"]}}},{"habilidad":"RECLAMOS 105 (FIBRA COMERCIAL)","frentes":{"callback":{"q1":{"realizado":1,"aRealizar":35,"cumplimiento":0.0286},"q2":{"realizado":0,"aRealizar":16,"cumplimiento":0.0},"mensual":{"realizado":1,"aRealizar":51,"cumplimiento":0.0196,"fuente":"q1_mas_q2"},"usuarios":18,"canales":["VOZ"]}}},{"habilidad":"S2S HOGAR","frentes":{"callback":{"q1":{"realizado":41,"aRealizar":51,"cumplimiento":0.8039},"q2":{"realizado":34,"aRealizar":18,"cumplimiento":1.8889},"mensual":{"realizado":75,"aRealizar":69,"cumplimiento":1.087,"fuente":"q1_mas_q2"},"usuarios":30,"canales":["VOZ"]}}},{"habilidad":"S2S MOVIL","frentes":{"callback":{"q1":{"realizado":0,"aRealizar":2,"cumplimiento":0.0},"q2":{"realizado":0,"aRealizar":1,"cumplimiento":0.0},"mensual":{"realizado":0,"aRealizar":3,"cumplimiento":0.0,"fuente":"q1_mas_q2"},"usuarios":1,"canales":["VOZ"]}}},{"habilidad":"S2S MOVIL 2.0","frentes":{"callback":{"q1":{"realizado":109,"aRealizar":126,"cumplimiento":0.8651},"q2":{"realizado":74,"aRealizar":53,"cumplimiento":1.3962},"mensual":{"realizado":183,"aRealizar":179,"cumplimiento":1.0223,"fuente":"q1_mas_q2"},"usuarios":73,"canales":["VOZ"]}}},{"habilidad":"TECNICO","frentes":{"callback":{"q1":{"realizado":45,"aRealizar":73,"cumplimiento":0.6164},"q2":{"realizado":38,"aRealizar":34,"cumplimiento":1.1176},"mensual":{"realizado":83,"aRealizar":107,"cumplimiento":0.7757,"fuente":"q1_mas_q2"},"usuarios":42,"canales":["VOZ"]}}},{"habilidad":"VENTA CROSS FIBRA 3.0","frentes":{"callback":{"q1":{"realizado":0,"aRealizar":14,"cumplimiento":0.0},"q2":{"realizado":0,"aRealizar":8,"cumplimiento":0.0},"mensual":{"realizado":0,"aRealizar":22,"cumplimiento":0.0,"fuente":"q1_mas_q2"},"usuarios":8,"canales":["VOZ"]}}}]},{"centro":"ECC CHILE","resumen":{"coachingIndividual":{"q1":{"realizado":131,"aRealizar":133,"cumplimiento":0.985},"q2":{"realizado":131,"aRealizar":133,"cumplimiento":0.985},"mensual":{"realizado":129,"aRealizar":133,"cumplimiento":0.9699,"fuente":"columnas_acumuladas"},"usuarios":133,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":22,"aRealizar":24,"cumplimiento":0.9167},"q2":{"realizado":24,"aRealizar":24,"cumplimiento":1.0},"mensual":{"realizado":46,"aRealizar":48,"cumplimiento":0.9583,"fuente":"q1_mas_q2"},"usuarios":12,"canales":["VOZ"]}},"habilidades":[{"habilidad":"RECLAMOS","frentes":{"coachingIndividual":{"q1":{"realizado":35,"aRealizar":36,"cumplimiento":0.9722},"q2":{"realizado":36,"aRealizar":36,"cumplimiento":1.0},"mensual":{"realizado":35,"aRealizar":36,"cumplimiento":0.9722,"fuente":"columnas_acumuladas"},"usuarios":36,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":5,"aRealizar":6,"cumplimiento":0.8333},"q2":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"mensual":{"realizado":11,"aRealizar":12,"cumplimiento":0.9167,"fuente":"q1_mas_q2"},"usuarios":3,"canales":["VOZ"]}}},{"habilidad":"ROAMING","frentes":{"coachingIndividual":{"q1":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"q2":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"mensual":{"realizado":6,"aRealizar":6,"cumplimiento":1.0,"fuente":"columnas_acumuladas"},"usuarios":6,"canales":["VOZ"]}}},{"habilidad":"TÉCNICO","frentes":{"coachingIndividual":{"q1":{"realizado":90,"aRealizar":91,"cumplimiento":0.989},"q2":{"realizado":89,"aRealizar":91,"cumplimiento":0.978},"mensual":{"realizado":88,"aRealizar":91,"cumplimiento":0.967,"fuente":"columnas_acumuladas"},"usuarios":91,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":17,"aRealizar":18,"cumplimiento":0.9444},"q2":{"realizado":18,"aRealizar":18,"cumplimiento":1.0},"mensual":{"realizado":35,"aRealizar":36,"cumplimiento":0.9722,"fuente":"q1_mas_q2"},"usuarios":9,"canales":["VOZ"]}}}]},{"centro":"ECC Chile","resumen":{"callback":{"q1":{"realizado":232,"aRealizar":270,"cumplimiento":0.8593},"q2":{"realizado":134,"aRealizar":129,"cumplimiento":1.0388},"mensual":{"realizado":366,"aRealizar":399,"cumplimiento":0.9173,"fuente":"q1_mas_q2"},"usuarios":148,"canales":["VOZ"]}},"habilidades":[{"habilidad":"RECLAMOS","frentes":{"callback":{"q1":{"realizado":68,"aRealizar":77,"cumplimiento":0.8831},"q2":{"realizado":24,"aRealizar":37,"cumplimiento":0.6486},"mensual":{"realizado":92,"aRealizar":114,"cumplimiento":0.807,"fuente":"q1_mas_q2"},"usuarios":40,"canales":["VOZ"]}}},{"habilidad":"TECNICO","frentes":{"callback":{"q1":{"realizado":164,"aRealizar":193,"cumplimiento":0.8497},"q2":{"realizado":110,"aRealizar":92,"cumplimiento":1.1957},"mensual":{"realizado":274,"aRealizar":285,"cumplimiento":0.9614,"fuente":"q1_mas_q2"},"usuarios":108,"canales":["VOZ"]}}}]},{"centro":"ECC PERU","resumen":{"coachingIndividual":{"q1":{"realizado":257,"aRealizar":270,"cumplimiento":0.9519},"q2":{"realizado":272,"aRealizar":288,"cumplimiento":0.9444},"mensual":{"realizado":263,"aRealizar":290,"cumplimiento":0.9069,"fuente":"columnas_acumuladas"},"usuarios":290,"canales":["DIGITAL","VOZ"]},"coachingGrupal":{"q1":{"realizado":51,"aRealizar":52,"cumplimiento":0.9808},"q2":{"realizado":47,"aRealizar":52,"cumplimiento":0.9038},"mensual":{"realizado":98,"aRealizar":104,"cumplimiento":0.9423,"fuente":"q1_mas_q2"},"usuarios":26,"canales":["DIGITAL","VOZ"]}},"habilidades":[{"habilidad":"FRONT HOGAR FIBRA","frentes":{"coachingIndividual":{"q1":{"realizado":19,"aRealizar":20,"cumplimiento":0.95},"q2":{"realizado":19,"aRealizar":20,"cumplimiento":0.95},"mensual":{"realizado":19,"aRealizar":20,"cumplimiento":0.95,"fuente":"columnas_acumuladas"},"usuarios":20,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":4,"aRealizar":4,"cumplimiento":1.0},"q2":{"realizado":4,"aRealizar":4,"cumplimiento":1.0},"mensual":{"realizado":8,"aRealizar":8,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":2,"canales":["VOZ"]}}},{"habilidad":"PREFERENTE 2.0","frentes":{"coachingIndividual":{"q1":{"realizado":26,"aRealizar":26,"cumplimiento":1.0},"q2":{"realizado":27,"aRealizar":27,"cumplimiento":1.0},"mensual":{"realizado":27,"aRealizar":27,"cumplimiento":1.0,"fuente":"columnas_acumuladas"},"usuarios":27,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":4,"aRealizar":4,"cumplimiento":1.0},"q2":{"realizado":4,"aRealizar":4,"cumplimiento":1.0},"mensual":{"realizado":8,"aRealizar":8,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":2,"canales":["VOZ"]}}},{"habilidad":"RETENCIONES N1.5 - FIBRA","frentes":{"coachingIndividual":{"q1":{"realizado":9,"aRealizar":9,"cumplimiento":1.0},"q2":{"realizado":9,"aRealizar":9,"cumplimiento":1.0},"mensual":{"realizado":9,"aRealizar":9,"cumplimiento":1.0,"fuente":"columnas_acumuladas"},"usuarios":9,"canales":["VOZ"]}}},{"habilidad":"RETENCIONES N2 - HOGAR FIBRA","frentes":{"coachingIndividual":{"q1":{"realizado":14,"aRealizar":22,"cumplimiento":0.6364},"q2":{"realizado":21,"aRealizar":21,"cumplimiento":1.0},"mensual":{"realizado":14,"aRealizar":22,"cumplimiento":0.6364,"fuente":"columnas_acumuladas"},"usuarios":22,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"q2":{"realizado":5,"aRealizar":6,"cumplimiento":0.8333},"mensual":{"realizado":11,"aRealizar":12,"cumplimiento":0.9167,"fuente":"q1_mas_q2"},"usuarios":3,"canales":["VOZ"]}}},{"habilidad":"RETENCIONES N2 - MOVIL","frentes":{"coachingIndividual":{"q1":{"realizado":45,"aRealizar":48,"cumplimiento":0.9375},"q2":{"realizado":56,"aRealizar":58,"cumplimiento":0.9655},"mensual":{"realizado":55,"aRealizar":59,"cumplimiento":0.9322,"fuente":"columnas_acumuladas"},"usuarios":59,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":12,"aRealizar":12,"cumplimiento":1.0},"q2":{"realizado":12,"aRealizar":12,"cumplimiento":1.0},"mensual":{"realizado":24,"aRealizar":24,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":6,"canales":["VOZ"]}}},{"habilidad":"RETENCIONES N3 - HOGAR FIBRA","frentes":{"coachingIndividual":{"q1":{"realizado":4,"aRealizar":4,"cumplimiento":1.0},"q2":{"realizado":4,"aRealizar":4,"cumplimiento":1.0},"mensual":{"realizado":4,"aRealizar":4,"cumplimiento":1.0,"fuente":"columnas_acumuladas"},"usuarios":4,"canales":["VOZ"]}}},{"habilidad":"RETENCIONES N3 - MOVIL","frentes":{"coachingIndividual":{"q1":{"realizado":11,"aRealizar":11,"cumplimiento":1.0},"q2":{"realizado":13,"aRealizar":13,"cumplimiento":1.0},"mensual":{"realizado":13,"aRealizar":13,"cumplimiento":1.0,"fuente":"columnas_acumuladas"},"usuarios":13,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":1,"aRealizar":2,"cumplimiento":0.5},"q2":{"realizado":2,"aRealizar":2,"cumplimiento":1.0},"mensual":{"realizado":3,"aRealizar":4,"cumplimiento":0.75,"fuente":"q1_mas_q2"},"usuarios":1,"canales":["VOZ"]}}},{"habilidad":"S2S HOGAR","frentes":{"coachingIndividual":{"q1":{"realizado":20,"aRealizar":20,"cumplimiento":1.0},"q2":{"realizado":10,"aRealizar":20,"cumplimiento":0.5},"mensual":{"realizado":10,"aRealizar":20,"cumplimiento":0.5,"fuente":"columnas_acumuladas"},"usuarios":20,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"q2":{"realizado":2,"aRealizar":6,"cumplimiento":0.3333},"mensual":{"realizado":8,"aRealizar":12,"cumplimiento":0.6667,"fuente":"q1_mas_q2"},"usuarios":3,"canales":["VOZ"]}}},{"habilidad":"S2S MOVIL 2.0","frentes":{"coachingIndividual":{"q1":{"realizado":56,"aRealizar":56,"cumplimiento":1.0},"q2":{"realizado":55,"aRealizar":56,"cumplimiento":0.9821},"mensual":{"realizado":55,"aRealizar":56,"cumplimiento":0.9821,"fuente":"columnas_acumuladas"},"usuarios":56,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":8,"aRealizar":8,"cumplimiento":1.0},"q2":{"realizado":8,"aRealizar":8,"cumplimiento":1.0},"mensual":{"realizado":16,"aRealizar":16,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":4,"canales":["VOZ"]}}},{"habilidad":"WHATSAPP HOGAR FIBRA","frentes":{"coachingGrupal":{"q1":{"realizado":2,"aRealizar":2,"cumplimiento":1.0},"q2":{"realizado":2,"aRealizar":2,"cumplimiento":1.0},"mensual":{"realizado":4,"aRealizar":4,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":1,"canales":["DIGITAL"]}}},{"habilidad":"WHATSAPP S2S HOGAR","frentes":{"coachingIndividual":{"q1":{"realizado":15,"aRealizar":15,"cumplimiento":1.0},"q2":{"realizado":17,"aRealizar":17,"cumplimiento":1.0},"mensual":{"realizado":17,"aRealizar":17,"cumplimiento":1.0,"fuente":"columnas_acumuladas"},"usuarios":17,"canales":["DIGITAL"]},"coachingGrupal":{"q1":{"realizado":2,"aRealizar":2,"cumplimiento":1.0},"q2":{"realizado":2,"aRealizar":2,"cumplimiento":1.0},"mensual":{"realizado":4,"aRealizar":4,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":1,"canales":["DIGITAL"]}}},{"habilidad":"WHATSAPP S2S MOVIL 2.0","frentes":{"coachingIndividual":{"q1":{"realizado":38,"aRealizar":39,"cumplimiento":0.9744},"q2":{"realizado":41,"aRealizar":43,"cumplimiento":0.9535},"mensual":{"realizado":40,"aRealizar":43,"cumplimiento":0.9302,"fuente":"columnas_acumuladas"},"usuarios":43,"canales":["DIGITAL"]},"coachingGrupal":{"q1":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"q2":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"mensual":{"realizado":12,"aRealizar":12,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":3,"canales":["DIGITAL"]}}}]},{"centro":"ECC Peru","resumen":{"callback":{"q1":{"realizado":367,"aRealizar":480,"cumplimiento":0.7646},"q2":{"realizado":331,"aRealizar":222,"cumplimiento":1.491},"mensual":{"realizado":698,"aRealizar":702,"cumplimiento":0.9943,"fuente":"q1_mas_q2"},"usuarios":352,"canales":["DIGITAL","VOZ"]}},"habilidades":[{"habilidad":"FRONT HOGAR FIBRA","frentes":{"callback":{"q1":{"realizado":34,"aRealizar":42,"cumplimiento":0.8095},"q2":{"realizado":33,"aRealizar":20,"cumplimiento":1.65},"mensual":{"realizado":67,"aRealizar":62,"cumplimiento":1.0806,"fuente":"q1_mas_q2"},"usuarios":23,"canales":["VOZ"]}}},{"habilidad":"PREFERENTE 2.0","frentes":{"callback":{"q1":{"realizado":50,"aRealizar":55,"cumplimiento":0.9091},"q2":{"realizado":42,"aRealizar":27,"cumplimiento":1.5556},"mensual":{"realizado":92,"aRealizar":82,"cumplimiento":1.122,"fuente":"q1_mas_q2"},"usuarios":28,"canales":["VOZ"]}}},{"habilidad":"RETENCIONES N1.5 - FIBRA","frentes":{"callback":{"q1":{"realizado":22,"aRealizar":24,"cumplimiento":0.9167},"q2":{"realizado":16,"aRealizar":10,"cumplimiento":1.6},"mensual":{"realizado":38,"aRealizar":34,"cumplimiento":1.1176,"fuente":"q1_mas_q2"},"usuarios":13,"canales":["VOZ"]}}},{"habilidad":"RETENCIONES N2 - HOGAR FIBRA","frentes":{"callback":{"q1":{"realizado":24,"aRealizar":44,"cumplimiento":0.5455},"q2":{"realizado":27,"aRealizar":22,"cumplimiento":1.2273},"mensual":{"realizado":51,"aRealizar":66,"cumplimiento":0.7727,"fuente":"q1_mas_q2"},"usuarios":24,"canales":["VOZ"]}}},{"habilidad":"RETENCIONES N2 - MOVIL","frentes":{"callback":{"q1":{"realizado":99,"aRealizar":113,"cumplimiento":0.8761},"q2":{"realizado":128,"aRealizar":56,"cumplimiento":2.2857},"mensual":{"realizado":227,"aRealizar":169,"cumplimiento":1.3432,"fuente":"q1_mas_q2"},"usuarios":60,"canales":["VOZ"]}}},{"habilidad":"S2S HOGAR","frentes":{"callback":{"q1":{"realizado":48,"aRealizar":56,"cumplimiento":0.8571},"q2":{"realizado":11,"aRealizar":25,"cumplimiento":0.44},"mensual":{"realizado":59,"aRealizar":81,"cumplimiento":0.7284,"fuente":"q1_mas_q2"},"usuarios":30,"canales":["VOZ"]}}},{"habilidad":"S2S MOVIL 2.0","frentes":{"callback":{"q1":{"realizado":90,"aRealizar":134,"cumplimiento":0.6716},"q2":{"realizado":74,"aRealizar":56,"cumplimiento":1.3214},"mensual":{"realizado":164,"aRealizar":190,"cumplimiento":0.8632,"fuente":"q1_mas_q2"},"usuarios":71,"canales":["VOZ"]}}},{"habilidad":"VENTA CROSS FIBRA 3.0","frentes":{"callback":{"q1":{"realizado":0,"aRealizar":12,"cumplimiento":0.0},"q2":{"realizado":0,"aRealizar":6,"cumplimiento":0.0},"mensual":{"realizado":0,"aRealizar":18,"cumplimiento":0.0,"fuente":"q1_mas_q2"},"usuarios":6,"canales":["VOZ"]}}},{"habilidad":"WHATSAPP HOGAR FIBRA","frentes":{"callback":{"q1":{"realizado":0,"aRealizar":0,"cumplimiento":null},"q2":{"realizado":0,"aRealizar":0,"cumplimiento":null},"mensual":{"realizado":0,"aRealizar":0,"cumplimiento":null,"fuente":"q1_mas_q2"},"usuarios":7,"canales":["DIGITAL"]}}},{"habilidad":"WHATSAPP RECLAMOS","frentes":{"callback":{"q1":{"realizado":0,"aRealizar":0,"cumplimiento":null},"q2":{"realizado":0,"aRealizar":0,"cumplimiento":null},"mensual":{"realizado":0,"aRealizar":0,"cumplimiento":null,"fuente":"q1_mas_q2"},"usuarios":19,"canales":["DIGITAL"]}}},{"habilidad":"WHATSAPP S2S HOGAR","frentes":{"callback":{"q1":{"realizado":0,"aRealizar":0,"cumplimiento":null},"q2":{"realizado":0,"aRealizar":0,"cumplimiento":null},"mensual":{"realizado":0,"aRealizar":0,"cumplimiento":null,"fuente":"q1_mas_q2"},"usuarios":23,"canales":["DIGITAL"]}}},{"habilidad":"WHATSAPP S2S MOVIL 2.0","frentes":{"callback":{"q1":{"realizado":0,"aRealizar":0,"cumplimiento":null},"q2":{"realizado":0,"aRealizar":0,"cumplimiento":null},"mensual":{"realizado":0,"aRealizar":0,"cumplimiento":null,"fuente":"q1_mas_q2"},"usuarios":48,"canales":["DIGITAL"]}}}]},{"centro":"KONECTA COLOMBIA","resumen":{"coachingIndividual":{"q1":{"realizado":0,"aRealizar":1,"cumplimiento":0.0},"q2":{"realizado":85,"aRealizar":86,"cumplimiento":0.9884},"mensual":{"realizado":85,"aRealizar":86,"cumplimiento":0.9884,"fuente":"columnas_acumuladas"},"usuarios":86,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"q2":{"realizado":12,"aRealizar":12,"cumplimiento":1.0},"mensual":{"realizado":18,"aRealizar":18,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":6,"canales":["VOZ"]}},"habilidades":[{"habilidad":"COMERCIAL 2.0","frentes":{"coachingIndividual":{"q1":{"realizado":0,"aRealizar":1,"cumplimiento":0.0},"q2":{"realizado":85,"aRealizar":86,"cumplimiento":0.9884},"mensual":{"realizado":85,"aRealizar":86,"cumplimiento":0.9884,"fuente":"columnas_acumuladas"},"usuarios":86,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"q2":{"realizado":12,"aRealizar":12,"cumplimiento":1.0},"mensual":{"realizado":18,"aRealizar":18,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":6,"canales":["VOZ"]}}}]},{"centro":"KONECTA PERU","resumen":{"coachingIndividual":{"q1":{"realizado":185,"aRealizar":190,"cumplimiento":0.9737},"q2":{"realizado":207,"aRealizar":217,"cumplimiento":0.9539},"mensual":{"realizado":202,"aRealizar":217,"cumplimiento":0.9309,"fuente":"columnas_acumuladas"},"usuarios":217,"canales":["DIGITAL","VOZ"]},"coachingGrupal":{"q1":{"realizado":29,"aRealizar":30,"cumplimiento":0.9667},"q2":{"realizado":30,"aRealizar":30,"cumplimiento":1.0},"mensual":{"realizado":59,"aRealizar":60,"cumplimiento":0.9833,"fuente":"q1_mas_q2"},"usuarios":15,"canales":["DIGITAL","VOZ"]}},"habilidades":[{"habilidad":"RECLAMOS","frentes":{"coachingIndividual":{"q1":{"realizado":32,"aRealizar":34,"cumplimiento":0.9412},"q2":{"realizado":35,"aRealizar":39,"cumplimiento":0.8974},"mensual":{"realizado":34,"aRealizar":39,"cumplimiento":0.8718,"fuente":"columnas_acumuladas"},"usuarios":39,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":4,"aRealizar":4,"cumplimiento":1.0},"q2":{"realizado":4,"aRealizar":4,"cumplimiento":1.0},"mensual":{"realizado":8,"aRealizar":8,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":2,"canales":["VOZ"]}}},{"habilidad":"S2S HOGAR","frentes":{"coachingIndividual":{"q1":{"realizado":31,"aRealizar":32,"cumplimiento":0.9688},"q2":{"realizado":33,"aRealizar":34,"cumplimiento":0.9706},"mensual":{"realizado":32,"aRealizar":34,"cumplimiento":0.9412,"fuente":"columnas_acumuladas"},"usuarios":34,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":5,"aRealizar":6,"cumplimiento":0.8333},"q2":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"mensual":{"realizado":11,"aRealizar":12,"cumplimiento":0.9167,"fuente":"q1_mas_q2"},"usuarios":3,"canales":["VOZ"]}}},{"habilidad":"S2S MOVIL 2.0","frentes":{"coachingIndividual":{"q1":{"realizado":42,"aRealizar":42,"cumplimiento":1.0},"q2":{"realizado":47,"aRealizar":51,"cumplimiento":0.9216},"mensual":{"realizado":47,"aRealizar":51,"cumplimiento":0.9216,"fuente":"columnas_acumuladas"},"usuarios":51,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"q2":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"mensual":{"realizado":12,"aRealizar":12,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":3,"canales":["VOZ"]}}},{"habilidad":"TÉCNICO","frentes":{"coachingIndividual":{"q1":{"realizado":34,"aRealizar":35,"cumplimiento":0.9714},"q2":{"realizado":45,"aRealizar":45,"cumplimiento":1.0},"mensual":{"realizado":44,"aRealizar":45,"cumplimiento":0.9778,"fuente":"columnas_acumuladas"},"usuarios":45,"canales":["VOZ"]},"coachingGrupal":{"q1":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"q2":{"realizado":6,"aRealizar":6,"cumplimiento":1.0},"mensual":{"realizado":12,"aRealizar":12,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":3,"canales":["VOZ"]}}},{"habilidad":"WHATSAPP S2S HOGAR","frentes":{"coachingIndividual":{"q1":{"realizado":16,"aRealizar":17,"cumplimiento":0.9412},"q2":{"realizado":17,"aRealizar":18,"cumplimiento":0.9444},"mensual":{"realizado":15,"aRealizar":18,"cumplimiento":0.8333,"fuente":"columnas_acumuladas"},"usuarios":18,"canales":["DIGITAL"]},"coachingGrupal":{"q1":{"realizado":4,"aRealizar":4,"cumplimiento":1.0},"q2":{"realizado":4,"aRealizar":4,"cumplimiento":1.0},"mensual":{"realizado":8,"aRealizar":8,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":2,"canales":["DIGITAL"]}}},{"habilidad":"WHATSAPP S2S MOVIL 2.0","frentes":{"coachingIndividual":{"q1":{"realizado":30,"aRealizar":30,"cumplimiento":1.0},"q2":{"realizado":30,"aRealizar":30,"cumplimiento":1.0},"mensual":{"realizado":30,"aRealizar":30,"cumplimiento":1.0,"fuente":"columnas_acumuladas"},"usuarios":30,"canales":["DIGITAL"]},"coachingGrupal":{"q1":{"realizado":4,"aRealizar":4,"cumplimiento":1.0},"q2":{"realizado":4,"aRealizar":4,"cumplimiento":1.0},"mensual":{"realizado":8,"aRealizar":8,"cumplimiento":1.0,"fuente":"q1_mas_q2"},"usuarios":2,"canales":["DIGITAL"]}}}]},{"centro":"Konecta Colombia","resumen":{"callback":{"q1":{"realizado":122,"aRealizar":118,"cumplimiento":1.0339},"q2":{"realizado":134,"aRealizar":96,"cumplimiento":1.3958},"mensual":{"realizado":256,"aRealizar":214,"cumplimiento":1.1963,"fuente":"q1_mas_q2"},"usuarios":122,"canales":["VOZ"]}},"habilidades":[{"habilidad":"COMERCIAL 2.0","frentes":{"callback":{"q1":{"realizado":122,"aRealizar":114,"cumplimiento":1.0702},"q2":{"realizado":134,"aRealizar":92,"cumplimiento":1.4565},"mensual":{"realizado":256,"aRealizar":206,"cumplimiento":1.2427,"fuente":"q1_mas_q2"},"usuarios":118,"canales":["VOZ"]}}},{"habilidad":"VENTA CROSS FIBRA 3.0","frentes":{"callback":{"q1":{"realizado":0,"aRealizar":4,"cumplimiento":0.0},"q2":{"realizado":0,"aRealizar":4,"cumplimiento":0.0},"mensual":{"realizado":0,"aRealizar":8,"cumplimiento":0.0,"fuente":"q1_mas_q2"},"usuarios":4,"canales":["VOZ"]}}}]},{"centro":"Konecta Peru","resumen":{"callback":{"q1":{"realizado":239,"aRealizar":332,"cumplimiento":0.7199},"q2":{"realizado":147,"aRealizar":152,"cumplimiento":0.9671},"mensual":{"realizado":386,"aRealizar":484,"cumplimiento":0.7975,"fuente":"q1_mas_q2"},"usuarios":232,"canales":["DIGITAL","VOZ"]}},"habilidades":[{"habilidad":"RECLAMOS","frentes":{"callback":{"q1":{"realizado":34,"aRealizar":72,"cumplimiento":0.4722},"q2":{"realizado":26,"aRealizar":38,"cumplimiento":0.6842},"mensual":{"realizado":60,"aRealizar":110,"cumplimiento":0.5455,"fuente":"q1_mas_q2"},"usuarios":41,"canales":["VOZ"]}}},{"habilidad":"S2S HOGAR","frentes":{"callback":{"q1":{"realizado":80,"aRealizar":76,"cumplimiento":1.0526},"q2":{"realizado":37,"aRealizar":35,"cumplimiento":1.0571},"mensual":{"realizado":117,"aRealizar":111,"cumplimiento":1.0541,"fuente":"q1_mas_q2"},"usuarios":39,"canales":["VOZ"]}}},{"habilidad":"S2S MOVIL 2.0","frentes":{"callback":{"q1":{"realizado":82,"aRealizar":92,"cumplimiento":0.8913},"q2":{"realizado":65,"aRealizar":44,"cumplimiento":1.4773},"mensual":{"realizado":147,"aRealizar":136,"cumplimiento":1.0809,"fuente":"q1_mas_q2"},"usuarios":47,"canales":["VOZ"]}}},{"habilidad":"TECNICO","frentes":{"callback":{"q1":{"realizado":43,"aRealizar":86,"cumplimiento":0.5},"q2":{"realizado":19,"aRealizar":32,"cumplimiento":0.5938},"mensual":{"realizado":62,"aRealizar":118,"cumplimiento":0.5254,"fuente":"q1_mas_q2"},"usuarios":45,"canales":["VOZ"]}}},{"habilidad":"VENTA CROSS FIBRA 3.0","frentes":{"callback":{"q1":{"realizado":0,"aRealizar":6,"cumplimiento":0.0},"q2":{"realizado":0,"aRealizar":3,"cumplimiento":0.0},"mensual":{"realizado":0,"aRealizar":9,"cumplimiento":0.0,"fuente":"q1_mas_q2"},"usuarios":3,"canales":["VOZ"]}}},{"habilidad":"WHATSAPP S2S HOGAR","frentes":{"callback":{"q1":{"realizado":0,"aRealizar":0,"cumplimiento":null},"q2":{"realizado":0,"aRealizar":0,"cumplimiento":null},"mensual":{"realizado":0,"aRealizar":0,"cumplimiento":null,"fuente":"q1_mas_q2"},"usuarios":24,"canales":["DIGITAL"]}}},{"habilidad":"WHATSAPP S2S MOVIL 2.0","frentes":{"callback":{"q1":{"realizado":0,"aRealizar":0,"cumplimiento":null},"q2":{"realizado":0,"aRealizar":0,"cumplimiento":null},"mensual":{"realizado":0,"aRealizar":0,"cumplimiento":null,"fuente":"q1_mas_q2"},"usuarios":33,"canales":["DIGITAL"]}}}]},{"centro":null,"resumen":{"coachingIndividual":{"q1":{"realizado":0,"aRealizar":0,"cumplimiento":null},"q2":{"realizado":0,"aRealizar":0,"cumplimiento":null},"mensual":{"realizado":0,"aRealizar":0,"cumplimiento":null,"fuente":"columnas_acumuladas"},"usuarios":0,"canales":[]}},"habilidades":[{"habilidad":null,"frentes":{"coachingIndividual":{"q1":{"realizado":0,"aRealizar":0,"cumplimiento":null},"q2":{"realizado":0,"aRealizar":0,"cumplimiento":null},"mensual":{"realizado":0,"aRealizar":0,"cumplimiento":null,"fuente":"columnas_acumuladas"},"usuarios":0,"canales":[]}}}]}]};

const CENTER_ORDER = [
  "A365 PERU",
  "ECC PERU",
  "ECC CHILE",
  "KONECTA PERU",
  "KONECTA COLOMBIA",
];

const TYPE_OPTIONS = [
  { value: "coachingGrupal", label: "Coaching Grupal" },
  { value: "coachingIndividual", label: "Coaching Individual" },
  { value: "callback", label: "Callback" },
];

const normalizeCenter = (value) => (value || "").trim().toUpperCase();

const fmtNumber = (value) =>
  new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 }).format(value || 0);

const fmtPct = (value) =>
  value == null ? "—" : `${(value * 100).toFixed(1)}%`;

const safePct = (realizado, aRealizar) =>
  aRealizar > 0 ? realizado / aRealizar : null;

function statusClasses(value, type) {
  if (value == null) return "bg-slate-100 text-slate-500 ring-slate-200";

  const isCallback = type === "callback";
  const green = isCallback ? 0.7 : 0.9;
  const yellow = isCallback ? 0.5 : 0.75;

  if (value >= green)
    return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (value >= yellow)
    return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-red-50 text-red-700 ring-red-200";
}

function MetricBadge({ value, type }) {
  return (
    <span
      className={`inline-flex min-w-[72px] justify-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${statusClasses(
        value,
        type
      )}`}
    >
      {fmtPct(value)}
    </span>
  );
}

function SelectField({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          {children}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </label>
  );
}

function KpiCard({ icon: Icon, label, main, sub, accent = false }) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${
        accent
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.12em] ${
              accent ? "text-blue-100" : "text-slate-500"
            }`}
          >
            {label}
          </p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight">{main}</p>
          <p
            className={`mt-1 text-xs ${
              accent ? "text-blue-100" : "text-slate-500"
            }`}
          >
            {sub}
          </p>
        </div>
        <div
          className={`rounded-xl p-2.5 ${
            accent ? "bg-white/15" : "bg-blue-50 text-blue-600"
          }`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardCXAgosto() {
  const [center, setCenter] = useState("TODOS");
  const [type, setType] = useState("coachingGrupal");
  const [skill, setSkill] = useState("TODAS");

  // Convierte la estructura anidada del JSON a filas y unifica centros
  // que en la fuente aparecen con diferencias de mayúsculas/minúsculas.
  const rows = useMemo(() => {
    const map = new Map();

    RAW_DATA.centros.forEach((centerNode) => {
      const normalized = normalizeCenter(centerNode.centro);
      if (!CENTER_ORDER.includes(normalized)) return;

      centerNode.habilidades.forEach((skillNode) => {
        Object.entries(skillNode.frentes || {}).forEach(([front, metrics]) => {
          const key = `${normalized}|||${skillNode.habilidad || "SIN HABILIDAD"}|||${front}`;
          const current = map.get(key) || {
            centro: normalized,
            habilidad: skillNode.habilidad || "Sin habilidad",
            tipo: front,
            q1A: 0,
            q1R: 0,
            q2A: 0,
            q2R: 0,
            monthlyA: 0,
            monthlyR: 0,
          };

          current.q1A += metrics.q1?.aRealizar || 0;
          current.q1R += metrics.q1?.realizado || 0;
          current.q2A += metrics.q2?.aRealizar || 0;
          current.q2R += metrics.q2?.realizado || 0;
          current.monthlyA += metrics.mensual?.aRealizar || 0;
          current.monthlyR += metrics.mensual?.realizado || 0;
          map.set(key, current);
        });
      });
    });

    return [...map.values()].map((row) => ({
      ...row,
      q1Pct: safePct(row.q1R, row.q1A),
      q2Pct: safePct(row.q2R, row.q2A),
      monthlyPct: safePct(row.monthlyR, row.monthlyA),
    }));
  }, []);

  const availableSkills = useMemo(() => {
    const values = rows
      .filter((r) => r.tipo === type)
      .filter((r) => center === "TODOS" || r.centro === center)
      .map((r) => r.habilidad);
    return [...new Set(values)].sort((a, b) => a.localeCompare(b, "es"));
  }, [rows, center, type]);

  const filtered = useMemo(
    () =>
      rows
        .filter((r) => r.tipo === type)
        .filter((r) => center === "TODOS" || r.centro === center)
        .filter((r) => skill === "TODAS" || r.habilidad === skill)
        .sort(
          (a, b) =>
            CENTER_ORDER.indexOf(a.centro) - CENTER_ORDER.indexOf(b.centro) ||
            a.habilidad.localeCompare(b.habilidad, "es")
        ),
    [rows, center, type, skill]
  );

  const totals = useMemo(() => {
    const sum = filtered.reduce(
      (acc, r) => {
        acc.q1A += r.q1A;
        acc.q1R += r.q1R;
        acc.q2A += r.q2A;
        acc.q2R += r.q2R;
        acc.monthlyA += r.monthlyA;
        acc.monthlyR += r.monthlyR;
        return acc;
      },
      { q1A: 0, q1R: 0, q2A: 0, q2R: 0, monthlyA: 0, monthlyR: 0 }
    );

    return {
      ...sum,
      q1Pct: safePct(sum.q1R, sum.q1A),
      q2Pct: safePct(sum.q2R, sum.q2A),
      monthlyPct: safePct(sum.monthlyR, sum.monthlyA),
    };
  }, [filtered]);

  const reset = () => {
    setCenter("TODOS");
    setType("coachingGrupal");
    setSkill("TODAS");
  };

  const selectedTypeLabel =
    TYPE_OPTIONS.find((item) => item.value === type)?.label || "";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-1.5 rounded-full bg-blue-600" />
              <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                Dashboard de Gestión CX
              </h1>
            </div>
            <p className="mt-1 pl-3.5 text-sm text-slate-500">
              Seguimiento de Callback y Coaching · Agosto 2026
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 sm:flex">
            <Activity size={15} />
            {selectedTypeLabel}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] space-y-6 px-5 py-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            icon={Target}
            label="Q1 · A realizar vs realizado"
            main={`${fmtNumber(totals.q1R)} / ${fmtNumber(totals.q1A)}`}
            sub={`Cumplimiento ${fmtPct(totals.q1Pct)}`}
          />
          <KpiCard
            icon={CheckCircle2}
            label="Q2 · A realizar vs realizado"
            main={`${fmtNumber(totals.q2R)} / ${fmtNumber(totals.q2A)}`}
            sub={`Cumplimiento ${fmtPct(totals.q2Pct)}`}
          />
          <KpiCard
            icon={UsersRound}
            label="Acumulado · realizado / meta"
            main={`${fmtNumber(totals.monthlyR)} / ${fmtNumber(
              totals.monthlyA
            )}`}
            sub="Acumulado mensual según lógica del frente"
          />
          <KpiCard
            icon={BarChart3}
            label="% Cumplimiento general"
            main={fmtPct(totals.monthlyPct)}
            sub={`${selectedTypeLabel} · Agosto`}
            accent
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            <SelectField
              label="Centro"
              value={center}
              onChange={(value) => {
                setCenter(value);
                setSkill("TODAS");
              }}
            >
              <option value="TODOS">Todos los centros</option>
              {CENTER_ORDER.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Tipo"
              value={type}
              onChange={(value) => {
                setType(value);
                setSkill("TODAS");
              }}
            >
              {TYPE_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </SelectField>

            <SelectField
              label="Habilidad ejecutivo"
              value={skill}
              onChange={setSkill}
            >
              <option value="TODAS">Todas las habilidades</option>
              {availableSkills.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectField>

            <div className="flex items-end">
              <button
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <RotateCcw size={16} />
                Limpiar filtros
              </button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold">Indicadores por centro y habilidad</h2>
              <p className="text-xs text-slate-500">
                {filtered.length} filas · {selectedTypeLabel}
              </p>
            </div>
            <div className="text-xs text-slate-500">
              {type === "callback"
                ? "Meta: ≥70% verde · 50–69% amarillo · <50% rojo"
                : "Meta: ≥90% verde · 75–89% amarillo · <75% rojo"}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[1320px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-bold">Centro</th>
                  <th className="px-4 py-3 font-bold">Habilidad</th>
                  <th className="px-3 py-3 text-right font-bold">A Realizar Q1</th>
                  <th className="px-3 py-3 text-right font-bold">Realizado Q1</th>
                  <th className="px-3 py-3 text-center font-bold">% Q1</th>
                  <th className="px-3 py-3 text-right font-bold">A Realizar Q2</th>
                  <th className="px-3 py-3 text-right font-bold">Realizado Q2</th>
                  <th className="px-3 py-3 text-center font-bold">% Q2</th>
                  <th className="px-3 py-3 text-right font-bold">Total A Realizar</th>
                  <th className="px-3 py-3 text-right font-bold">Total Realizado</th>
                  <th className="px-3 py-3 text-center font-bold">% Acumulado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((row) => (
                  <tr
                    key={`${row.centro}-${row.habilidad}-${row.tipo}`}
                    className="transition hover:bg-blue-50/40"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-800">
                      {row.centro}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-600">
                      {row.habilidad}
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums">{fmtNumber(row.q1A)}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{fmtNumber(row.q1R)}</td>
                    <td className="px-3 py-3 text-center"><MetricBadge value={row.q1Pct} type={type} /></td>
                    <td className="px-3 py-3 text-right tabular-nums">{fmtNumber(row.q2A)}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{fmtNumber(row.q2R)}</td>
                    <td className="px-3 py-3 text-center"><MetricBadge value={row.q2Pct} type={type} /></td>
                    <td className="px-3 py-3 text-right font-semibold tabular-nums">{fmtNumber(row.monthlyA)}</td>
                    <td className="px-3 py-3 text-right font-semibold tabular-nums">{fmtNumber(row.monthlyR)}</td>
                    <td className="px-3 py-3 text-center"><MetricBadge value={row.monthlyPct} type={type} /></td>
                  </tr>
                ))}
                {!filtered.length && (
                  <tr>
                    <td colSpan={11} className="px-4 py-14 text-center text-slate-500">
                      No hay datos para la combinación de filtros seleccionada.
                    </td>
                  </tr>
                )}
              </tbody>
              {!!filtered.length && (
                <tfoot className="border-t-2 border-slate-200 bg-slate-50 font-bold">
                  <tr>
                    <td className="px-4 py-3" colSpan={2}>TOTAL FILTRADO</td>
                    <td className="px-3 py-3 text-right">{fmtNumber(totals.q1A)}</td>
                    <td className="px-3 py-3 text-right">{fmtNumber(totals.q1R)}</td>
                    <td className="px-3 py-3 text-center"><MetricBadge value={totals.q1Pct} type={type} /></td>
                    <td className="px-3 py-3 text-right">{fmtNumber(totals.q2A)}</td>
                    <td className="px-3 py-3 text-right">{fmtNumber(totals.q2R)}</td>
                    <td className="px-3 py-3 text-center"><MetricBadge value={totals.q2Pct} type={type} /></td>
                    <td className="px-3 py-3 text-right">{fmtNumber(totals.monthlyA)}</td>
                    <td className="px-3 py-3 text-right">{fmtNumber(totals.monthlyR)}</td>
                    <td className="px-3 py-3 text-center"><MetricBadge value={totals.monthlyPct} type={type} /></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </section>

        <p className="pb-2 text-center text-xs text-slate-400">
          En Coaching Individual, el acumulado mensual utiliza las columnas acumuladas de la fuente y no la suma Q1 + Q2.
        </p>
      </main>
    </div>
  );
}

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { ReportData } from "@/types/report";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Roboto-Italic.ttf", fontStyle: "italic" },
  ],
});

const getChartUrl = (swot: ReportData["swot"]) => {
  const chartConfig = {
    type: "bar",
    data: {
      labels: ["Strengths", "Weaknesses", "Opportunities", "Threats"],
      datasets: [
        {
          label: "Number of Factors",
          data: [
            swot.strengths.length,
            swot.weaknesses.length,
            swot.opportunities.length,
            swot.threats.length,
          ],
          backgroundColor: "rgba(124, 58, 237, 0.5)",
          borderColor: "#7c3aed",
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
        title: { display: false },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            },
          },
        ],
      },
    },
  };

  return `https://quickchart.io/chart?c=${encodeURIComponent(
    JSON.stringify(chartConfig),
  )}&w=500&h=200&bkg=white`;
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#18181b",
    marginBottom: 20,
  },
  ideaContainer: {
    backgroundColor: "#f4f4f5",
    padding: 20,
    borderRadius: 8,
    marginBottom: 24,
  },
  ideaText: {
    fontSize: 14,
    lineHeight: 1.5,
    color: "#3f3f46",
    fontStyle: "italic",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  scoreCard: {
    width: "30%",
    backgroundColor: "#7c3aed",
    padding: 20,
    borderRadius: 8,
  },
  scoreLabel: { fontSize: 12, color: "#ede9fe", marginBottom: 8 },
  scoreValue: { fontSize: 36, fontWeight: "bold", color: "#ffffff" },
  statCard: {
    width: "32%",
    padding: 20,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 8,
    justifyContent: "center",
  },
  statLabel: { fontSize: 12, color: "#71717a", marginBottom: 8 },
  statValue: { fontSize: 24, fontWeight: "bold", color: "#18181b" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#18181b",
    marginBottom: 16,
    marginTop: 10,
  },
  chartContainer: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#fafafa",
  },
  chartImage: {
    width: 450,
    height: 180,
    objectFit: "contain",
  },
  swotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  swotCard: {
    width: "48%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 8,
    marginBottom: 16,
  },
  swotCardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#18181b",
    textTransform: "capitalize",
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f5",
    paddingBottom: 8,
    marginBottom: 8,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bullet: { width: 10, fontSize: 10, color: "#7c3aed" },
  bulletText: { flex: 1, fontSize: 11, lineHeight: 1.4, color: "#52525b" },
});

interface ReportPDFProps {
  reportData: ReportData;
}

export function ReportPDF({ reportData }: ReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Market Validation Report</Text>

        <View style={styles.ideaContainer}>
          <Text style={styles.ideaText}>"{reportData.idea}"</Text>
        </View>

        <View style={styles.statsRow} wrap={false}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Validation Score</Text>
            <Text style={styles.scoreValue}>{reportData.score}/100</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Addressable Market</Text>
            <Text style={styles.statValue}>{reportData.marketSize}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Competitor Risk</Text>
            <Text style={styles.statValue}>{reportData.competitorRisk}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Analysis Distribution</Text>

        <View style={styles.chartContainer} wrap={false}>
          <Image src={getChartUrl(reportData.swot)} style={styles.chartImage} />
        </View>

        <Text style={styles.sectionTitle}>AI SWOT Analysis</Text>

        <View style={styles.swotGrid}>
          {Object.entries(reportData.swot).map(
            ([key, items]: [string, string[]]) => (
              <View key={key} style={styles.swotCard} wrap={false}>
                <Text style={styles.swotCardTitle}>{key}</Text>
                {items.map((item: string, index: number) => (
                  <View key={index} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{item}</Text>
                  </View>
                ))}
              </View>
            ),
          )}
        </View>
      </Page>
    </Document>
  );
}

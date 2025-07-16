export default function PreEventLetter() {
    return (
        <div className="w-full max-w-2xl mx-auto px-8 py-10 space-y-8">
            <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-muted-foreground gap-y-1">
                    由 HITCON 工人聯絡組 張貼
                    <div>2025 年 8 月 15 日（五）23:59</div>
                </div>
                <h1 className="text-2xl font-semibold">HITCON CMT 2024 工人行前通知</h1>
                <p className="text-sm text-muted-foreground">
                    各位工人好，轉眼活動就快到了，我們有些事情要來通知大家。
                </p>
            </div>

            <article className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
                <h3>住宿</h3>
                <p>
                    若你有申請住宿並收到通知，Day0 場佈結束後請直接前往住宿點。詳細內容請參閱你 08/15 收到的住宿行前信。
                </p>
                <p>
                    住宿地點：雀客藏居台北南港（115 台北市南港區重陽路 59 號）<br/>
                    ※ 提供沐浴乳、洗髮精及一次性備品（牙刷、梳子、刮鬍刀、浴帽、香皂、紙拖鞋）<br/>
                    ※ 本次住宿不含早餐，請至人文館使用早餐
                </p>
                <ul>
                    <li>08/22 15:00 起可辦理 Check-in，須出示有照片之政府核發證件</li>
                    <li>建議於 22:00 前入住，晚間僅有一位櫃檯人員可能需等候</li>
                    <li>08/24 10:00 前需辦理退房</li>
                </ul>
                <p><strong>⚠️ 若不認識對方，請勿擅入他人房間。</strong></p>

                <h3>住宿接駁車</h3>
                <ul>
                    <li>Day1 與 Day2 上午 07:30 / 07:40 各一班接駁車前往人文社會科學館</li>
                    <li>Day1 會眾接駁結束後，另有接駁車回住宿點</li>
                </ul>

                <h3>工人報到</h3>
                <p><strong>地點：</strong> 3F 工人用餐區</p>
                <p><strong>時間：</strong> 由各組組長安排</p>
                <p>請依各組安排準時報到並領取以下物品：</p>
                <ul>
                    <li>衣服 x2（黑 T 為 D1，卡其 T 為 D2）</li>
                    <li>無線電（有分配才領，並依組別時間歸還）</li>
                    <li>Badge（遺失不補發）</li>
                </ul>
                <p>
                    報到時間段：<br/>
                    9:00 前 → 向活動組領取 Badge<br/>
                    9:00–10:00 → 走特殊報到軌<br/>
                    10:00 後 → 至大會服務台領取 Badge
                </p>
                <p>報到後請前往 3F 工人用餐區享用早餐。</p>

                <h3>工人用餐時間</h3>
                <ul>
                    <li>地點：工人休息區</li>
                    <li>早餐送達時間：07:30</li>
                    <li>午餐便當送達時間：約 11:30–11:40</li>
                </ul>

                <h3>工人大合照</h3>
                <p>Day2 早上 08:00，請至 R0 舞台集合拍攝工人大合照。</p>

                <h3>交通補助</h3>
                <ul>
                    <li>Day1 / Day2 11:00–16:00，憑票根至服務台領現金補助</li>
                    <li>實體票根請於 08/31 前掛號寄回，信封請註明身份與「交通補助回程票根」</li>
                    <li>電子票根請於 08/31 前 Email 給葉子</li>
                </ul>

                <h3>工人慶功宴</h3>
                <ul>
                    <li>Day2 活動結束後將有兩班接駁車（17:50、18:05）</li>
                    <li>地點：錢櫃 台北敦南店（忠孝敦化站八號出口旁）</li>
                    <li>18:30 準時開唱</li>
                </ul>

                <h3>工人 WiFi</h3>
                <p>SSID：HITCON CMT 2024 Staff via KKCO<br/>密碼：sudoconnectme</p>

            </article>
        </div>
    )
}

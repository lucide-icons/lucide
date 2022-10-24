package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Diamond: ImageVector
    get() {
        if (_diamond != null) {
            return _diamond!!
        }
        _diamond = Builder(name = "Diamond", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(13.7041f, 2.7041f)
                lineTo(21.2985f, 10.2985f)
                arcTo(2.41f, 2.41f, 90.0f, false, true, 21.2985f, 13.7067f)
                lineTo(13.7041f, 21.301f)
                arcTo(2.41f, 2.41f, 0.0f, false, true, 10.2959f, 21.301f)
                lineTo(2.7015f, 13.7067f)
                arcTo(2.41f, 2.41f, 0.0f, false, true, 2.7015f, 10.2985f)
                lineTo(10.2959f, 2.7041f)
                arcTo(2.41f, 2.41f, 90.0f, false, true, 13.7041f, 2.7041f)
                close()
            }
        }
        .build()
        return _diamond!!
    }

private var _diamond: ImageVector? = null

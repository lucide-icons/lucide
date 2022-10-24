package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Instagram: ImageVector
    get() {
        if (_instagram != null) {
            return _instagram!!
        }
        _instagram = Builder(name = "Instagram", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(7.0f, 2.0f)
                lineTo(17.0f, 2.0f)
                arcTo(5.0f, 5.0f, 0.0f, false, true, 22.0f, 7.0f)
                lineTo(22.0f, 17.0f)
                arcTo(5.0f, 5.0f, 0.0f, false, true, 17.0f, 22.0f)
                lineTo(7.0f, 22.0f)
                arcTo(5.0f, 5.0f, 0.0f, false, true, 2.0f, 17.0f)
                lineTo(2.0f, 7.0f)
                arcTo(5.0f, 5.0f, 0.0f, false, true, 7.0f, 2.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(16.0f, 11.37f)
                arcTo(4.0f, 4.0f, 0.0f, true, true, 12.63f, 8.0f)
                arcTo(4.0f, 4.0f, 0.0f, false, true, 16.0f, 11.37f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(17.5f, 6.5f)
                lineTo(17.51f, 6.5f)
            }
        }
        .build()
        return _instagram!!
    }

private var _instagram: ImageVector? = null

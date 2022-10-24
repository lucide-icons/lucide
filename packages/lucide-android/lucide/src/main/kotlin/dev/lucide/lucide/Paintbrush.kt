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

public val Lucide.Paintbrush: ImageVector
    get() {
        if (_paintbrush != null) {
            return _paintbrush!!
        }
        _paintbrush = Builder(name = "Paintbrush", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(18.37f, 2.63f)
                lineTo(14.0f, 7.0f)
                lineToRelative(-1.59f, -1.59f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, -2.82f, 0.0f)
                lineTo(8.0f, 7.0f)
                lineToRelative(9.0f, 9.0f)
                lineToRelative(1.59f, -1.59f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 0.0f, -2.82f)
                lineTo(17.0f, 10.0f)
                lineToRelative(4.37f, -4.37f)
                arcToRelative(2.12f, 2.12f, 0.0f, true, false, -3.0f, -3.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(9.0f, 8.0f)
                curveToRelative(-2.0f, 3.0f, -4.0f, 3.5f, -7.0f, 4.0f)
                lineToRelative(8.0f, 10.0f)
                curveToRelative(2.0f, -1.0f, 6.0f, -5.0f, 6.0f, -7.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(14.5f, 17.5f)
                lineTo(4.5f, 15.0f)
            }
        }
        .build()
        return _paintbrush!!
    }

private var _paintbrush: ImageVector? = null

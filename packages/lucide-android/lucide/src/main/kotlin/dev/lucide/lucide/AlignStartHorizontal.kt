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

public val Lucide.AlignStartHorizontal: ImageVector
    get() {
        if (_alignStartHorizontal != null) {
            return _alignStartHorizontal!!
        }
        _alignStartHorizontal = Builder(name = "AlignStartHorizontal", defaultWidth = 24.0.dp,
                defaultHeight = 24.0.dp, viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(6.0f, 6.0f)
                lineTo(8.0f, 6.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 10.0f, 8.0f)
                lineTo(10.0f, 20.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 8.0f, 22.0f)
                lineTo(6.0f, 22.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 4.0f, 20.0f)
                lineTo(4.0f, 8.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 6.0f, 6.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(16.0f, 6.0f)
                lineTo(18.0f, 6.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 20.0f, 8.0f)
                lineTo(20.0f, 13.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 18.0f, 15.0f)
                lineTo(16.0f, 15.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 14.0f, 13.0f)
                lineTo(14.0f, 8.0f)
                arcTo(2.0f, 2.0f, 0.0f, false, true, 16.0f, 6.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(22.0f, 2.0f)
                horizontalLineTo(2.0f)
            }
        }
        .build()
        return _alignStartHorizontal!!
    }

private var _alignStartHorizontal: ImageVector? = null
